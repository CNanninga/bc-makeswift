import { createContext, useContext } from "react";
import { FullCategory } from "./my-bigcommerce/types";

export const CategoryContext = createContext<FullCategory | null>(null);

export function useCategory(): FullCategory | null {
    return useContext(CategoryContext);
}