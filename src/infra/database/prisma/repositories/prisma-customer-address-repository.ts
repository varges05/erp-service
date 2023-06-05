/* eslint-disable no-useless-constructor */
import { Injectable } from '@nestjs/common'
import { AddressesCustomersRepository } from '@app/repositories/customer-address-repository'
import { PrismaService } from '../prisma.service'
import { AddressCustomer } from '@prisma/client'

@Injectable()
export class PrismaCustomerAddressRepository
  implements AddressesCustomersRepository
{
  constructor(private prisma: PrismaService) {}

  async deleteCustomerAddress(
    customerId: string,
    addressId: string,
  ): Promise<void> {
    await this.prisma.customerAddress.deleteMany({
      where: {
        customerId,
        addressId,
      },
    })
  }

  async findByAddressId(customerId: string): Promise<AddressCustomer[]> {
    return this.prisma.customerAddress.findMany({
      where: {
        customerId,
      },
    })
  }

  async createAddressCustomer(customerAddress: AddressCustomer): Promise<void> {
    await this.prisma.addressCustomer.create({
      data: {
        id: customerAddress.id,
        addressId: customerAddress.addressId,
        customerId: customerAddress.customerId,
        createdAt: customerAddress.createdAt,
      },
    })
  }

  async getCustomerAddressesByCustomerId(
    customerId: string,
  ): Promise<AddressCustomer[]> {
    return this.prisma.customerAddress.findMany({
      where: {
        customerId,
      },
    })
  }
}
