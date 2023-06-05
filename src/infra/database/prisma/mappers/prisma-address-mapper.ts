import { Address as RawAddress } from '@prisma/client'
import { Address } from '@app/entities/address/address'
import { Cep } from '@app/entities/address/cep'
import { Road } from '@app/entities/address/road'

export class PrismaAddressMapper {
  static toPrisma(address: Address) {
    return {
      id: address.id,
      road: address.road.value,
      neighborhood: address.neighborhood,
      number: address.number,
      cep: address.cep.value,
      complement: address.complement,
      updatedAt: address.updatedAt,
    }
  }

  static toDomain(raw: RawAddress): Address {
    return new Address(
      {
        road: new Road(raw.road),
        neighborhood: raw.neighborhood,
        number: raw.number,
        cep: new Cep(raw.cep),
        complement: raw.complement,
        updatedAt: raw.updatedAt,
        createAt: raw.createdAt,
      },
      raw.id,
    )
  }
}
