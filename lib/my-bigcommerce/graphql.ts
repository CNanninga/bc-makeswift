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