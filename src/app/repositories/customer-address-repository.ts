import { AddressCustomer } from '@prisma/client'

export abstract class AddressesCustomersRepository {
  abstract createAddressCustomer(
    customerAddress: AddressCustomer,
  ): Promise<void>

  abstract getCustomerAddressesByCustomerId(
    customerId: string,
  ): Promise<AddressCustomer[]>

  abstract deleteCustomerAddress(
    customerId: string,
    addressId: string,
  ): Promise<void>

  abstract findByAddressId(customerId: string): Promise<AddressCustomer[]>
}
