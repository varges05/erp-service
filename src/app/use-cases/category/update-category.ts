/* eslint-disable no-useless-constructor */
import { CategoriesRepository } from '@app/repositories/category-repository'
import { Injectable } from '@nestjs/common'
import { NotificationNotFound } from '../errors/notification-not-found'
import { Abbreviation } from '@app/entities/category/abbreviation'
import { Name } from '@app/entities/category/name'
import { Category } from '@app/entities/category/category'

export interface UpdateCategoryRequest {
  categoryId: string
  name: string
  abbreviation: string
  active: boolean
}

@Injectable()
export class UpdateCategory {
  constructor(private categoryRepository: CategoriesRepository) {}

  async execute(request: UpdateCategoryRequest): Promise<Category> {
    const { categoryId, name, abbreviation, active } = request

    // Verificar se a categoria existe no repositório
    const existingCategory = await this.categoryRepository.findById(categoryId)
    if (!existingCategory) {
      throw new NotificationNotFound()
    }

    // Atualizar os dados da categoria existente
    existingCategory.name = new Name(name)
    existingCategory.abbreviation = new Abbreviation(abbreviation)
    existingCategory.active = active

    // Chamar o método update do categoryRepository para salvar as alterações
    const updatedCategory = await this.categoryRepository.update(
      existingCategory,
    )
    if (!updatedCategory) {
      throw new NotificationNotFound()
    }

    return updatedCategory
  }
}
