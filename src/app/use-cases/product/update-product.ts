/* eslint-disable no-useless-constructor */
import { Injectable } from '@nestjs/common'
import { Decimal } from '@prisma/client/runtime'
import { CategoryNotFound } from '../errors/category-not-found'
import { Code } from '@app/entities/product/code'
import { Name } from '@app/entities/product/name'
import { Product } from '@app/entities/product/product'
import { ProductsCategoriesRepository } from '@app/repositories/product-category-repository'
import { ProductsRepository } from '@app/repositories/product-repository'
import { ProductCategory } from '@app/entities/product-category/product-category'

export interface UpdateProductRequest {
  productId: string
  name: string
  code: string
  price: Decimal | number
  active: boolean
  categoryIds: string[]
}

export interface UpdateProductResponse {
  product: Product
  categories: ProductCategory[]
}

@Injectable()
export class UpdateProduct {
  constructor(
    private readonly productRepository: ProductsRepository,
    private readonly productCategoryRepository: ProductsCategoriesRepository,
  ) {}

  async execute(request: UpdateProductRequest): Promise<UpdateProductResponse> {
    const { productId, name, price, code, active, categoryIds } = request

    const existingProduct = await this.productRepository.findById(productId)
    if (!existingProduct) {
      throw new CategoryNotFound()
    }

    existingProduct.name = new Name(name)
    existingProduct.code = new Code(code)
    existingProduct.price = price
    existingProduct.active = active
    existingProduct.updated()

    if (
      !existingProduct.categories ||
      !Array.isArray(existingProduct.categories)
    ) {
      existingProduct.categories = []
    }

    const existingCategories =
      await this.productCategoryRepository.getProductCategoriesByProductId(
        productId,
      )

    const existingCategoryIds = existingCategories.map(
      (category) => category.categoryId,
    )

    const categoriesToRemove = existingCategoryIds.filter(
      (categoryId) => !categoryIds.includes(categoryId),
    )

    for (const categoryId of categoriesToRemove) {
      await this.productCategoryRepository.deleteProductCategory(
        productId,
        categoryId,
      )
    }

    const updatedCategories: ProductCategory[] = []

    for (const categoryId of categoryIds) {
      const existingCategory = existingCategories.find(
        (productCategory) => productCategory.categoryId === categoryId,
      )

      if (!existingCategory) {
        const productCategory = new ProductCategory({
          categoryId,
          productId,
        })

        await this.productCategoryRepository.createProductCategory(
          productCategory,
        )

        existingProduct.categories.push(productCategory)
        updatedCategories.push(productCategory)
      }
    }

    const updatedProduct = await this.productRepository.update(existingProduct)
    if (!updatedProduct) {
      throw new CategoryNotFound()
    }

    return {
      product: updatedProduct,
      categories: updatedCategories,
    }
  }
}
