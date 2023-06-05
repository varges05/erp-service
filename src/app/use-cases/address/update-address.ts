/* eslint-disable no-useless-constructor */
import { AddressesRepository } from '@app/repositories/address-repository'
import { Injectable } from '@nestjs/common'
import { Road } from '@app/entities/address/road'
import { Address } from '@app/entities/address/address'
import { AddressNotFound } from '../errors/address-not-found'
import { Cep } from '@app/entities/address/cep'

export interface UpdateAddressRequest {
  addressId: string
  road: string
  neighborhood: string
  number: string
  cep: string
  complement: string
  updatedAt?: Date
}

@Injectable()
export class UpdateAddress {
  constructor(private addressRepository: AddressesRepository) {}

  async execute(request: UpdateAddressRequest): Promise<Address> {
    const { addressId, road, neighborhood, number, cep, complement } = request

    // Verificar se a categoria existe no repositório
    const existingAddress = await this.addressRepository.findById(addressId)
    if (!existingAddress) {
      throw new AddressNotFound()
    }

    // Atualizar os dados da categoria existente
    existingAddress.road = new Road(road)
    existingAddress.cep = new Cep(cep)
    existingAddress.neighborhood = neighborhood
    existingAddress.number = number
    existingAddress.complement = complement
    existingAddress.updated()

    // Chamar o método update do addressRepository para salvar as alterações
    const updatedAddress = await this.addressRepository.update(existingAddress)
    if (!updatedAddress) {
      throw new AddressNotFound()
    }

    return updatedAddress
  }
}
