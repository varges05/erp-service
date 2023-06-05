/* eslint-disable no-useless-constructor */
import { CategoriesRepository } from '@app/repositories/category-repository'
import { Injectable } from '@nestjs/common'
import { Abbreviation } from '@app/entities/category/abbreviation'
import { Name } from '@app/entities/category/name'
import { Category } from '@app/entities/category/category'
import { CategoryNotFound } from '../errors/category-not-found'

export interface UpdateCategoryRequest {
  categoryId: string
  name: string
  abbreviation: string
  active: boolean
  updatedAt?: Date
}

@Injectable()
export class UpdateCategory {
  constructor(private categoryRepository: CategoriesRepository) {}

  async execute(request: UpdateCategoryRequest): Promise<Category> {
    const { categoryId, name, abbreviation, active } = request

    // Verificar se a categoria existe no repositório
    const existingCategory = await this.categoryRepository.findById(categoryId)
    if (!existingCategory) {
      throw new CategoryNotFound()
    }

    // Atualizar os dados da categoria existente
    existingCategory.name = new Name(name)
    existingCategory.abbreviation = new Abbreviation(abbreviation)
    existingCategory.active = active
    existingCategory.updated()

    // Chamar o método update do categoryRepository para salvar as alterações
    const updatedCategory = await this.categoryRepository.update(
      existingCategory,
    )
    if (!updatedCategory) {
      throw new CategoryNotFound()
    }

    return updatedCategory
  }
}
