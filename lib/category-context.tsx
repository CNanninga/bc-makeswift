import { createContext, useContext } from "react";
import { FullCategory } from "./my-bigcommerce/types";
import { DEFAULT_FULL_CATEGORY } from "./my-bigcommerce/default-values";

export const CategoryContext = createContext<FullCategory>(DEFAULT_FULL_CATEGORY);

export function useCategory(): FullCategory {
    return useContext(CategoryContext);
}