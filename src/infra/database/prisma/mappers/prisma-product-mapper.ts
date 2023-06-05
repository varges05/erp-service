import { Product as RawProduct } from '@prisma/client'
import { Product } from '@app/entities/product/product'
import { Name } from '@app/entities/product/name'
import { Code } from '@app/entities/product/code'

export class PrismaProductMapper {
  static toPrisma(product: Product) {
    return {
      id: product.id,
      code: product.code.value,
      name: product.name.value,
      active: product.active,
      price: product.price,
      updatedAt: product.updatedAt,
    }
  }

  static toDomain(raw: RawProduct): Product {
    return new Product(
      {
        name: new Name(raw.name),
        code: new Code(raw.code),
        active: raw.active,
        price: raw.price,
        updatedAt: raw.updatedAt,
        createAt: raw.createdAt,
      },
      raw.id,
    )
  }
}
