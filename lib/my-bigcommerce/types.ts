import { ProductFragment } from "lib/bigcommerce"

export type FullCategory = {
  name: string
  description: string
}

export type FullCategoryQuery = {
  site: {
    category: FullCategory
  }
}

export type CategoryProductsQuery = {
  site: {
    search: {
      searchProducts: {
        products: {
          edges: {
            node: ProductFragment
          }[]
        }
      }
    }
  }
}