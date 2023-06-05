/* eslint-disable no-useless-constructor */

import { Injectable } from '@nestjs/common'
import { AddressesCustomersRepository } from '@app/repositories/customer-address-repository'
import { AddressCustomer } from '@app/entities/customer-address/customer-address'

// Interface para a requisição de envio de categoria
interface SaveCustomerAddressRequest {
  addressId: string
  customerId: string
}

// Interface para a resposta do envio de categoria
interface SaveCustomerAddressResponse {
  customerAddress: AddressCustomer
}

@Injectable()
export class SaveCustomerAddress {
  constructor(
    private customerAddressRepository: AddressesCustomersRepository,
  ) {}

  // Método execute para enviar a categoria
  async executeCustomerAddress(
    request: SaveCustomerAddressRequest,
  ): Promise<SaveCustomerAddressResponse> {
    const { addressId, customerId } = request

    const customerAddress = new AddressCustomer({
      addressId,
      customerId,
    })

    await this.customerAddressRepository.createAddressCustomer(customerAddress)
    // Retorna a categoria como parte da resposta
    return {
      customerAddress,
    }
  }
}
