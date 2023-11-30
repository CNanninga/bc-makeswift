import { getCategories } from "./bigcommerce"

export default async function getGlobalProps() {
    const topCategories = await getCategories();

    return {
        topCategories,
    }
}