import { ProductCategory } from '@prisma/client'

export abstract class ProductsCategoriesRepository {
  abstract createProductCategory(
    productCategory: ProductCategory,
  ): Promise<void>

  abstract getProductCategoriesByProductId(
    productId: string,
  ): Promise<ProductCategory[]>

  abstract deleteProductCategory(
    productId: string,
    categoryId: string,
  ): Promise<void>

  abstract findByProductId(productId: string): Promise<ProductCategory[]>
}
