/* eslint-disable no-useless-constructor */
import { Injectable } from '@nestjs/common'
import { AddressesRepository } from '@app/repositories/address-repository'
import { PrismaService } from '../prisma.service'
import { PrismaAddressMapper } from '../mappers/prisma-address-mapper'
import { Address } from '@app/entities/address/address'
import { AddressNotFound } from '@app/use-cases/errors/address-not-found'

@Injectable()
export class PrismaAddressRepository implements AddressesRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Address[]> {
    const rawAddresses = await this.prisma.address.findMany()
    return rawAddresses.map(PrismaAddressMapper.toDomain)
  }

  async update(address: Address): Promise<Address> {
    const { id, road, neighborhood, number, cep, complement } = address

    const updatedAddress = await this.prisma.address.update({
      where: { id },
      data: {
        road: road.value,
        neighborhood,
        number,
        cep: cep.value,
        complement,
      },
    })

    if (!updatedAddress) {
      throw new AddressNotFound()
    }

    return PrismaAddressMapper.toDomain(updatedAddress)
  }

  async findById(addressId: string): Promise<Address | null> {
    const rawAddress = await this.prisma.address.findUnique({
      where: {
        id: addressId,
      },
    })

    if (!rawAddress) {
      return null
    }

    return PrismaAddressMapper.toDomain(rawAddress)
  }

  async create(address: Address): Promise<void> {
    const raw = PrismaAddressMapper.toPrisma(address)
    await this.prisma.address.create({
      data: raw,
    })
  }

  async save(address: Address): Promise<void> {
    const raw = PrismaAddressMapper.toPrisma(address)

    await this.prisma.address.update({
      where: {
        id: raw.id,
      },
      data: raw,
    })
  }
}
