import { Product } from '@app/entities/product/product'

export class ProductViewModel {
  static toHTTP(product: Product) {
    return {
      id: product.id,
      name: product.name.value,
      code: product.code.value,
      price: product.price,
      active: product.active,
    }
  }
}
