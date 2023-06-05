/* eslint-disable no-useless-constructor */
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common'
import { CreateAddressBody } from '../dtos/create.address.body'
import { SaveAddress } from '@app/use-cases/address/save-address'
import { AddressViewModel } from '../view-models/address-view-model'
import { GetAddress } from '@app/use-cases/address/get-address'
import { UpdateAddress } from '@app/use-cases/address/update-address'
import { ListAddress } from '@app/use-cases/address/list-address'
import { AddressCustomerViewModel } from '../view-models/address-customer-view-model'

@Controller('addresses')
export class AddressController {
  constructor(
    private saveAddress: SaveAddress,
    private getAddress: GetAddress,
    private updateAddress: UpdateAddress,
    private listAddress: ListAddress,
  ) {}

  @Get()
  async getAllAddresses() {
    const addresses = await this.listAddress.getAll()
    return {
      addresses,
    }
  }

  @Patch('update/:id')
  async update(
    @Body() body: CreateAddressBody,
    @Param('id') addressId: string,
  ) {
    const { road, neighborhood, number, cep, complement } = body
    const address = await this.updateAddress.execute({
      addressId,
      road,
      neighborhood,
      number,
      cep,
      complement,
    })
    return {
      address: AddressViewModel.toHTTP(address),
    }
  }

  @Get('from/:addressId')
  async getFromAddress(@Param('addressId') addressId: string) {
    const { address } = await this.getAddress.execute({
      addressId,
    })
    return {
      address: AddressViewModel.toHTTP(address),
    }
  }

  @Post()
  async create(@Body() body: CreateAddressBody) {
    const { road, neighborhood, number, cep, complement, customerIds } = body

    const { address, customers } = await this.saveAddress.executeAddress({
      road,
      neighborhood,
      number,
      cep,
      complement,
      customerIds,
    })
    return {
      address: AddressViewModel.toHTTP(address),
      addressCustomers: customers.map(AddressCustomerViewModel.toHTTP),
    }
  }
}
