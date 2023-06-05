import { Address } from '../entities/address/address'

export abstract class AddressesRepository {
  abstract create(address: Address): Promise<void>
  abstract findById(addressId: string): Promise<Address | null>
  abstract update(address: Address): Promise<Address>
  abstract findAll(): Promise<Address[]>
}
