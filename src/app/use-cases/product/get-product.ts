/* eslint-disable no-useless-constructor */
import { ProductsRepository } from '@app/repositories/product-repository'
import { Injectable } from '@nestjs/common'
import { ProductNotFound } from '../errors/product-not-found'
import { Product } from '@app/entities/product/product'
import { CategoriesRepository } from '@app/repositories/category-repository'
import { Category } from '@app/entities/category/category'

interface GetProductRequest {
  productId: string
}

interface GetProductResponse {
  product: Product
  categories: Category[]
}

@Injectable()
export class GetProduct {
  constructor(
    private productRepository: ProductsRepository,
    private categoryRepository: CategoriesRepository,
  ) {}

  async execute(request: GetProductRequest): Promise<GetProductResponse> {
    const { productId } = request

    const product = await this.productRepository.findById(productId)

    if (!product) {
      throw new ProductNotFound()
    }

    const categories = await this.categoryRepository.getCategoriesByProductId(
      productId,
    )

    return {
      product,
      categories,
    }
  }
}
