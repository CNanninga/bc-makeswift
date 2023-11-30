import { useCategory } from "lib/category-context"

type CategoryNameProps = {
    className?: string
}

export function CategoryName({ className }: CategoryNameProps) {
    const category = useCategory()

    if (category === null) return ''

    return <div className={`${className} text-[44px] text-black font-light`}>{category.name}</div>
}

type CategoryDescriptionProps = {
    className?: string
  }
  
  export function CategoryDescription({ className }: CategoryDescriptionProps) {
    const category = useCategory()
  
    return (
      <div
        className={`${className} text-lg text-black/70 font-light`}
        dangerouslySetInnerHTML={{ __html: category.description }}
      />
    )
  }