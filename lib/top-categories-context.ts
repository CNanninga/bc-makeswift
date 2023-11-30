import { createContext, useContext } from "react";
import { Category } from "./bigcommerce";
import { DEFAULT_TOP_CATEGORY } from "./my-bigcommerce/default-values";

export const TopCategoriesContext = createContext<Category[]>([DEFAULT_TOP_CATEGORY]);

export function useTopCategories(): Category[] {
    return useContext(TopCategoriesContext);
}