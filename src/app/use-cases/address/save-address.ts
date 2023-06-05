/* eslint-disable no-useless-constructor */

import { Injectable } from '@nestjs/common'
import { AddressCustomer } from '@app/entities/customer-address/customer-address'
import { AddressesCustomersRepository } from '@app/repositories/customer-address-repository'
import { Address } from '@app/entities/address/address'
import { Road } from '@app/entities/address/road'
import { Cep } from '@app/entities/address/cep'
import { AddressesRepository } from '@app/repositories/address-repository'

// Interface para a requisição de envio de categoria
interface SaveAddressRequest {
  customerIds: string[] // Array de IDs de categoria
  road: string
  neighborhood: string
  number: string
  cep: string
  complement: string
}

// Interface para a resposta do envio de categoria
interface SaveAddressResponse {
  address: Address
  customers: AddressCustomer[]
}

@Injectable()
export class SaveAddress {
  constructor(
    private addressRepository: AddressesRepository,
    private addressCustomerRepository: AddressesCustomersRepository,
  ) {}

  async createAddressCustomer(customerAddress: AddressCustomer): Promise<void> {
    await this.addressCustomerRepository.createAddressCustomer(customerAddress)
  }

  // Método execute para enviar a categoria
  async executeAddress(
    request: SaveAddressRequest,
  ): Promise<SaveAddressResponse> {
    const { road, neighborhood, number, cep, complement, customerIds } = request

    // Cria uma nova instância de Customer com os dados fornecidos
    const address = new Address({
      road: new Road(road),
      cep: new Cep(cep),
      neighborhood,
      number,
      complement,
    })

    // Chama o método create do customerRepository para persistir o produto
    await this.addressRepository.create(address)
    const addressId = address.id

    const customerAddresses: AddressCustomer[] = []

    // Salvar as categorias
    for (const customerId of customerIds) {
      const customerAddress = new AddressCustomer({
        addressId,
        customerId,
      })
      await this.addressCustomerRepository.createAddressCustomer(
        customerAddress,
      )
      customerAddresses.push(customerAddress)
    }
    console.log(customerAddresses)
    // Retorna o produto como parte da resposta
    return {
      address,
      customers: customerAddresses,
    } as SaveAddressResponse
  }
}
