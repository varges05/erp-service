import { Category } from '@app/entities/category/category'
import { CategoriesRepository } from '@app/repositories/category-repository'

export class InMemoryCategoryRepository implements CategoriesRepository {
  public categories: Category[] = []

  async findById(categoryId: string): Promise<Category | null> {
    const category = this.categories.find((item) => item.id === categoryId)

    if (!category) {
      return null
    }
    return category
  }

  async create(category: Category) {
    this.categories.push(category)
  }

  async save(category: Category): Promise<void> {
    const categoryIndex = this.categories.findIndex(
      (item) => item.id === category.id,
    )

    if (categoryIndex >= 0) {
      this.categories[categoryIndex] = category
    }
  }
}
