import { ProductCategory } from '@app/entities/product-category/product-category'

export class ProductCategoryViewModel {
  static toHTTP(productCategory: ProductCategory) {
    return {
      id: productCategory.id,
      productId: productCategory.productId,
      categoryId: productCategory.categoryId,
    }
  }
}
