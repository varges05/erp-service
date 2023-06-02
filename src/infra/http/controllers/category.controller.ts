/* eslint-disable no-useless-constructor */
import { Body, Controller, Post } from '@nestjs/common'
import { CreateCategoryBody } from '../dtos/create.category.body'
import { SaveCategory } from '@app/use-cases/category/save-category'
import { CategoryViewModel } from '../view-models/category-view-model'

@Controller('categories')
export class CategoryController {
  constructor(private saveCategory: SaveCategory) {}

  @Post()
  async create(@Body() body: CreateCategoryBody) {
    const { name, abbreviation, active } = body

    const { category } = await this.saveCategory.execute({
      name,
      abbreviation,
      active,
    })
    return {
      category: CategoryViewModel.toHTTP(category),
    }
  }
}
