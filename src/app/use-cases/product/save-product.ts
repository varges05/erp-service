/* eslint-disable no-useless-constructor */

import { Product } from '@app/entities/product/product'
import { Name } from '@app/entities/product/name'
import { ProductsRepository } from '@app/repositories/product-repository'
import { Injectable } from '@nestjs/common'
import { Code } from '@app/entities/product/code'
import { Decimal } from '@prisma/client/runtime'
import { ProductCategory } from '@app/entities/product-category/product-category'
import { ProductsCategoriesRepository } from '@app/repositories/product-category-repository'

// Interface para a requisição de envio de categoria
interface SaveProductRequest {
  categoryIds: string[] // Array de IDs de categoria
  name: string
  code: string
  price: Decimal | number
  active: boolean
}

// Interface para a resposta do envio de categoria
interface SaveProductResponse {
  product: Product
  categories: ProductCategory[]
}

@Injectable()
export class SaveProduct {
  constructor(
    private productRepository: ProductsRepository,
    private productCategoryRepository: ProductsCategoriesRepository,
  ) {}

  async createProductCategory(productCategory: ProductCategory): Promise<void> {
    await this.productCategoryRepository.createProductCategory(productCategory)
  }

  // Método execute para enviar a categoria
  async executeProduct(
    request: SaveProductRequest,
  ): Promise<SaveProductResponse> {
    const { name, code, price, active, categoryIds } = request

    // Cria uma nova instância de Product com os dados fornecidos
    const product = new Product({
      name: new Name(name),
      code: new Code(code),
      price,
      active,
    })

    // Chama o método create do productRepository para persistir o produto
    await this.productRepository.createProduct(product)
    const productId = product.id

    const productCategories: ProductCategory[] = []

    // Salvar as categorias
    for (const categoryId of categoryIds) {
      const productCategory = new ProductCategory({
        categoryId,
        productId,
      })
      await this.productCategoryRepository.createProductCategory(
        productCategory,
      )
      productCategories.push(productCategory)
    }

    // Retorna o produto como parte da resposta
    return {
      product,
      categories: productCategories,
    } as SaveProductResponse
  }
}
