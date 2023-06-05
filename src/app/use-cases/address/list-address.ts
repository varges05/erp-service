/* eslint-disable no-useless-constructor */
import { AddressesRepository } from '@app/repositories/address-repository'
import { AddressViewModel } from '@helpers/infra/http/view-models/address-view-model'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ListAddress {
  constructor(private addressRepository: AddressesRepository) {}

  async getAll() {
    const addresses = await this.addressRepository.findAll()
    return addresses.map((address) => AddressViewModel.toHTTP(address))
  }
}
