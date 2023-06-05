import { Category } from '../entities/category/category'

export abstract class CategoriesRepository {
  abstract create(category: Category): Promise<void>
  abstract findById(categoryId: string): Promise<Category | null>
  abstract update(category: Category): Promise<Category>
  abstract findAll(): Promise<Category[]>
  abstract getCategoriesByProductId(productId: string): Promise<Category[]>
}
