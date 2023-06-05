/* eslint-disable no-useless-constructor */

import { Injectable } from '@nestjs/common'
import { ProductCategory } from '@app/entities/product-category/product-category'
import { ProductsCategoriesRepository } from '@app/repositories/product-category-repository'

// Interface para a requisição de envio de categoria
interface SaveProductCategoryRequest {
  categoryId: string
  productId: string
}

// Interface para a resposta do envio de categoria
interface SaveProductCategoryResponse {
  productCategory: ProductCategory
}

@Injectable()
export class SaveProductCategory {
  constructor(
    private productCategoryRepository: ProductsCategoriesRepository,
  ) {}

  // Método execute para enviar a categoria
  async executeProductCategory(
    request: SaveProductCategoryRequest,
  ): Promise<SaveProductCategoryResponse> {
    const { categoryId, productId } = request

    const productCategory = new ProductCategory({
      categoryId,
      productId,
    })

    await this.productCategoryRepository.createProductCategory(productCategory)
    // Retorna a categoria como parte da resposta
    return {
      productCategory,
    }
  }
}
