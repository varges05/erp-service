import { Seller as RawSeller } from '@prisma/client'
import { Seller } from '@app/entities/seller/seller'
import { Name } from '@app/entities/seller/name'

export class PrismaSellerMapper {
  static toPrisma(seller: Seller) {
    return {
      id: seller.id,
      name: seller.name.value,
      email: seller.email,
      active: seller.active,
      updatedAt: seller.updatedAt,
    }
  }

  static toDomain(raw: RawSeller): Seller {
    return new Seller(
      {
        name: new Name(raw.name),
        active: raw.active,
        email: raw.email,
        updatedAt: raw.updatedAt,
        createAt: raw.createdAt,
      },
      raw.id,
    )
  }
}
