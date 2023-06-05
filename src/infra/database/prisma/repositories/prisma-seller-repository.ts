/* eslint-disable no-useless-constructor */
import { Injectable } from '@nestjs/common'
import { SellersRepository } from '@app/repositories/seller-repository'
import { PrismaService } from '../prisma.service'
import { PrismaSellerMapper } from '../mappers/prisma-seller-mapper'
import { Seller } from '@app/entities/seller/seller'
import { SellerNotFound } from '@app/use-cases/errors/seller-not-found'

@Injectable()
export class PrismaSellerRepository implements SellersRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Seller[]> {
    const rawSellers = await this.prisma.seller.findMany()
    return rawSellers.map(PrismaSellerMapper.toDomain)
  }

  async update(seller: Seller): Promise<Seller> {
    const { id, name, active, email } = seller

    const updatedSeller = await this.prisma.seller.update({
      where: { id },
      data: {
        name: name.value,
        email,
        active,
      },
    })

    if (!updatedSeller) {
      throw new SellerNotFound()
    }

    return PrismaSellerMapper.toDomain(updatedSeller)
  }

  async findById(sellerId: string): Promise<Seller | null> {
    const rawSeller = await this.prisma.seller.findUnique({
      where: {
        id: sellerId,
      },
    })

    if (!rawSeller) {
      return null
    }

    return PrismaSellerMapper.toDomain(rawSeller)
  }

  async create(seller: Seller): Promise<void> {
    const raw = PrismaSellerMapper.toPrisma(seller)
    await this.prisma.seller.create({
      data: raw,
    })
  }

  async save(seller: Seller): Promise<void> {
    const raw = PrismaSellerMapper.toPrisma(seller)

    await this.prisma.seller.update({
      where: {
        id: raw.id,
      },
      data: raw,
    })
  }
}
