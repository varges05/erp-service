/* eslint-disable no-useless-constructor */
import { CategoriesRepository } from '@app/repositories/category-repository'
import { CategoryViewModel } from '@helpers/infra/http/view-models/category-view-model'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ListCategory {
  constructor(private categoryRepository: CategoriesRepository) {}

  async getAll() {
    const categories = await this.categoryRepository.findAll()
    return categories.map((category) => CategoryViewModel.toHTTP(category))
  }
}
