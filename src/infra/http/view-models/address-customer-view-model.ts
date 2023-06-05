import { AddressCustomer } from '@app/entities/customer-address/customer-address'

export class AddressCustomerViewModel {
  static toHTTP(addressCustomer: AddressCustomer) {
    return {
      id: addressCustomer.id,
      addressId: addressCustomer.addressId,
      customerId: addressCustomer.customerId,
    }
  }
}
