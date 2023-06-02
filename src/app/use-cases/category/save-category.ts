/* eslint-disable no-useless-constructor */
import { Abbreviation } from '@app/entities/category/abbreviation'
import { Category } from '@app/entities/category/category'
import { Name } from '@app/entities/category/name'
import { CategoriesRepository } from '@app/repositories/category-repository'
import { Injectable } from '@nestjs/common'

// Interface para a requisição de envio de categoria
interface SaveCategoryRequest {
  name: string
  abbreviation: string
  active: boolean
}

// Interface para a resposta do envio de categoria
interface SaveCategoryResponse {
  category: Category
}

@Injectable()
export class SaveCategory {
  constructor(private categoryRepository: CategoriesRepository) {}

  // Método execute para enviar a categoria
  async execute(request: SaveCategoryRequest): Promise<SaveCategoryResponse> {
    const { name, abbreviation, active } = request

    // Cria uma nova instância de Category com os dados fornecidos
    const category = new Category({
      name: new Name(name),
      abbreviation: new Abbreviation(abbreviation),
      active,
    })

    // Chama o método create do categoryRepository para persistir a categoria
    await this.categoryRepository.create(category)

    // Retorna a categoria como parte da resposta
    return {
      category,
    }
  }
}
