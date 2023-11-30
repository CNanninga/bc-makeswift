import { PRODUCT_FRAGMENT } from "lib/bigcommerce/graphql"

export const FULL_CATEGORY_QUERY = /* GraphQL */ `
    query Category($entityId: Int!) {
        site {
            category(entityId: $entityId) {
                name
                description
            }
        }
    }
`

export const CATEGORY_PRODUCTS_QUERY = /* GraphQL */ `
  query Products($entityId: Int!) {
    site {
      search {
        searchProducts(
            filters: {categoryEntityId: $entityId}
        ) {
            products {
                edges {
                    node {
                        ...Product
                    }
                }
            }
        }
      }
    }
  }

  ${PRODUCT_FRAGMENT}
`