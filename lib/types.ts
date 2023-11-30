import { ProductFragment, Category } from './bigcommerce'
import { FullCategory } from './my-bigcommerce/types'

export type PageProps = {
  products: ProductFragment[]
}

export type ProductPageProps = {
  products: ProductFragment[]
  product: ProductFragment
}

export type CategoryPageProps = {
  products: ProductFragment[]
  category: FullCategory,
  categoryProducts: ProductFragment[]
}
