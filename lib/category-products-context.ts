import { createContext, useContext } from "react";
import { ProductFragment } from "./bigcommerce";
import { DEFAULT_PRODUCT } from "./bigcommerce";

export const CategoryProductsContext = createContext<ProductFragment[]>([DEFAULT_PRODUCT]);

export function useCategoryProducts(): ProductFragment[] {
    return useContext(CategoryProductsContext);
}