/* eslint-disable no-useless-constructor */
import { AddressesRepository } from '@app/repositories/address-repository'
import { Injectable } from '@nestjs/common'
import { AddressNotFound } from '../errors/address-not-found'
import { Address } from '@app/entities/address/address'

interface GetAddressRequest {
  addressId: string
}

interface GetAddressResponse {
  address: Address
}

@Injectable()
export class GetAddress {
  constructor(private addressRepository: AddressesRepository) {}

  async execute(request: GetAddressRequest): Promise<GetAddressResponse> {
    const { addressId } = request

    const address = await this.addressRepository.findById(addressId)

    if (!address) {
      throw new AddressNotFound()
    }
    return {
      address,
    }
  }
}
