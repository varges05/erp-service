import { Seller } from '@app/entities/seller/seller'

export class SellerViewModel {
  static toHTTP(seller: Seller) {
    return {
      id: seller.id,
      name: seller.name.value,
      email: seller.email,
      active: seller.active,
    }
  }
}
