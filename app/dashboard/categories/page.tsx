import { CategoryList } from "@/components/category-list"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { AddCategoryDialog } from "@/components/add-category-dialog"

export default function CategoriesPage() {
  return (
    <div className="flex flex-col space-y-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Categories</h2>
        <AddCategoryDialog>
          <Button size="sm">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Category
          </Button>
        </AddCategoryDialog>
      </div>
      <CategoryList />
    </div>
  )
}
