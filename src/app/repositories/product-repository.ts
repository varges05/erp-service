import { Product } from '../entities/product/product'

export abstract class ProductsRepository {
  abstract createProduct(product: Product): Promise<void>
  abstract findById(productId: string): Promise<Product | null>
  abstract update(product: Product): Promise<Product>
  abstract findAll(): Promise<Product[]>
}
