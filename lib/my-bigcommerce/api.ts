import { FullCategory, FullCategoryQuery } from "./types";
import { getConfig } from "lib/config";
import { FULL_CATEGORY_QUERY } from "./graphql";
import { GraphQLResponse } from "lib/bigcommerce";

export async function getFullCategory(id: number): Promise<FullCategory | null> {
    const config = getConfig()
    const response = await fetch(config.bigcommerce.storefrontURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + config.bigcommerce.storefrontToken,
      },
      body: JSON.stringify({
        query: FULL_CATEGORY_QUERY,
        variables: { entityId: id },
      }),
    })
  
    if (!response.ok) throw new Error(response.statusText)
  
    const result: GraphQLResponse<FullCategoryQuery> = await response.json()
  
    if (result.errors != null) {
      result.errors.forEach(error => {
        console.error(error.message)
      })
  
      throw new Error('There was an error fetching the category.')
    }

    return result.data.site.category ?? null;
}