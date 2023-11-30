export type FullCategory = {
    name: string
    description: string
}

export type FullCategoryQuery = {
    site: {
      category: FullCategory
    }
  }