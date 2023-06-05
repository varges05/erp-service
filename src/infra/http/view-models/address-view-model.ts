import { Address } from '@app/entities/address/address'

export class AddressViewModel {
  static toHTTP(address: Address) {
    return {
      id: address.id,
      road: address.road.value,
      neighborhood: address.neighborhood,
      number: address.number,
      cep: address.cep.value,
      complement: address.complement,
    }
  }
}
