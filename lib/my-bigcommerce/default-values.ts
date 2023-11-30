import { Category } from "lib/bigcommerce"
import { FullCategory } from "./types"

export const DEFAULT_TOP_CATEGORY: Category = {
    entityId: 1,
    name: 'Glassware',
    path: 'glassware',
}

export const DEFAULT_FULL_CATEGORY: FullCategory = {
    name: 'Glassware',
    description: 'All the glassware you could ask for'
}