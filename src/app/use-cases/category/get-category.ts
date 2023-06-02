/* eslint-disable no-useless-constructor */
import { CategoriesRepository } from '@app/repositories/category-repository'
import { Injectable } from '@nestjs/common'
import { CategoryNotFound } from '../errors/category-not-found'
import { Category } from '@app/entities/category/category'

interface GetCategoryRequest {
  categoryId: string
}

interface GetCategoryResponse {
  category: Category
}

@Injectable()
export class GetCategory {
  constructor(private categoryRepository: CategoriesRepository) {}

  async execute(request: GetCategoryRequest): Promise<GetCategoryResponse> {
    const { categoryId } = request

    const category = await this.categoryRepository.findById(categoryId)

    if (!category) {
      throw new CategoryNotFound()
    }
    return {
      category,
    }
  }
}
