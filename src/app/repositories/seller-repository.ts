import { Seller } from '../entities/seller/seller'

export abstract class SellersRepository {
  abstract create(seller: Seller): Promise<void>
  abstract findById(sellerId: string): Promise<Seller | null>
  abstract update(seller: Seller): Promise<Seller>
  abstract findAll(): Promise<Seller[]>
}
