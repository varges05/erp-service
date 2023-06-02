import { Category } from '@app/entities/category/category'

export class CategoryViewModel {
  static toHTTP(category: Category) {
    return {
      id: category.id,
      name: category.name.value,
      abbreviation: category.abbreviation.value,
    }
  }
}
