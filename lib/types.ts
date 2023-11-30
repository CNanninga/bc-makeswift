import { ProductFragment, Category } from './bigcommerce'

export type PageProps = {
  products: ProductFragment[]
}

export type ProductPageProps = {
  products: ProductFragment[]
  product: ProductFragment
}

export type CategoryPageProps = {
  products: ProductFragment[]
}
