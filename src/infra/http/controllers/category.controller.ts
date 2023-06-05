/* eslint-disable no-useless-constructor */
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common'
import { CreateCategoryBody } from '../dtos/create.category.body'
import { SaveCategory } from '@app/use-cases/category/save-category'
import { CategoryViewModel } from '../view-models/category-view-model'
import { GetCategory } from '@app/use-cases/category/get-category'
import { UpdateCategory } from '@app/use-cases/category/update-category'
import { ListCategory } from '@app/use-cases/category/list-category'

@Controller('categories')
export class CategoryController {
  constructor(
    private saveCategory: SaveCategory,
    private getCategory: GetCategory,
    private updateCategory: UpdateCategory,
    private listCategory: ListCategory,
  ) {}

  @Get()
  async getAllCategories() {
    const categories = await this.listCategory.getAll()
    return {
      categories,
    }
  }

  @Patch('update/:id')
  async update(
    @Body() body: CreateCategoryBody,
    @Param('id') categoryId: string,
  ) {
    const { name, abbreviation, active } = body
    const category = await this.updateCategory.execute({
      categoryId,
      name,
      abbreviation,
      active,
    })
    return {
      category: CategoryViewModel.toHTTP(category),
    }
  }

  @Get('from/:categoryId')
  async getFromCategory(@Param('categoryId') categoryId: string) {
    const { category } = await this.getCategory.execute({
      categoryId,
    })
    return {
      category: CategoryViewModel.toHTTP(category),
    }
  }

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
