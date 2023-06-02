import { Category } from '../entities/category/category'

export abstract class CategoriesRepository {
  abstract create(category: Category): Promise<void>
}
