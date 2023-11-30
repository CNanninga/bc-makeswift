import 'lib/makeswift/register-components'

import { 
    PageProps as MakeswiftPageProps,
    Page as MakeswiftPage,
    Makeswift
} from "@makeswift/runtime/next";

import { GetStaticPropsContext, GetStaticPropsResult, GetStaticPathsContext, GetStaticPathsResult } from 'next';
import { getConfig } from 'lib/config';
import { getProducts, getCategories } from 'lib/bigcommerce';
import getGlobalProps from 'lib/global-props';
import { CategoryPageProps } from 'lib/types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { DEFAULT_LOCALE } from 'lib/locale';
import { getFullCategory, getCategoryProducts } from 'lib/my-bigcommerce/api';
import { ProductsContext } from 'lib/products-context';
import { CategoryContext } from 'lib/category-context';
import { CategoryProductsContext } from 'lib/category-products-context';

type Props = MakeswiftPageProps & CategoryPageProps;

export async function getStaticPaths(ctx: GetStaticPathsContext): Promise<GetStaticPathsResult> {
    const categories = await getCategories();

    const categoriesWithLocale = categories.flatMap(category => {
        if (ctx.locales == null) return { category, locale: ctx.defaultLocale }
    
        return ctx.locales.map(locale => ({ category, locale }))
      })

    return {
        paths: categoriesWithLocale.map(({ category, locale }) => ({
            params: { slug: category.entityId.toString() },
            locale,
        })),
        fallback: 'blocking',
    }
}

export async function getStaticProps(ctx: GetStaticPropsContext): Promise<GetStaticPropsResult<Props>> {
    const config = getConfig();

    const makeswift = new Makeswift(config.makeswift.siteApiKey);
    
    const snapshot = await makeswift.getPageSnapshot(config.makeswift.categoryTemplatePathname, {
        preview: ctx.preview,
      })
    
    if (snapshot == null) return { notFound: true, revalidate: 1 }

    const slug = ctx.params?.slug

    if (slug == null) throw new Error('"slug" URL parameter must be defined.')

    const catId = Number.parseInt(slug.toString(), 10);
    const [products, category, categoryProducts, globalProps] = await Promise.all([
        getProducts(),
        getFullCategory(catId),
        getCategoryProducts(catId),
        getGlobalProps()
    ])

    if (category == null) return { notFound: true, revalidate: 1 }

    return {
        props: {
            ...(await serverSideTranslations(ctx.locale ?? DEFAULT_LOCALE, [
                'common',
                'cart',
                'product',
              ])),
            ...globalProps,
            snapshot,
            products,
            category,
            categoryProducts,
        },
        revalidate: 1,
    }
}

export default function CategoryPage({products, category, categoryProducts, snapshot}: Props) {
    return (
        <ProductsContext.Provider value={products}>
            <CategoryContext.Provider value={category}>
                <CategoryProductsContext.Provider value={categoryProducts}>
                    <MakeswiftPage snapshot={snapshot} />
                </CategoryProductsContext.Provider>
            </CategoryContext.Provider>
        </ProductsContext.Provider>
    )
}