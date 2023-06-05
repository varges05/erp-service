/* eslint-disable no-useless-constructor */
import { Injectable } from '@nestjs/common'
import { ProductsRepository } from '@app/repositories/product-repository'
import { PrismaService } from '../prisma.service'
import { PrismaProductMapper } from '../mappers/prisma-product-mapper'
import { Product } from '@app/entities/product/product'
import { ProductNotFound } from '@app/use-cases/errors/product-not-found'
import { ProductCategory } from '@prisma/client'

@Injectable()
export class PrismaProductRepository implements ProductsRepository {
  constructor(private prisma: PrismaService) {}
  async createProductCategory(productCategory: ProductCategory): Promise<void> {
    await this.prisma.productCategory.create({
      data: {
        id: productCategory.id,
        categoryId: productCategory.categoryId,
        productId: productCategory.productId,
        createdAt: productCategory.createdAt,
      },
    })
  }

  async findAll(): Promise<Product[]> {
    const rawProducts = await this.prisma.product.findMany()
    return rawProducts.map((rawProduct) =>
      PrismaProductMapper.toDomain(rawProduct),
    )
  }

  async listAll(): Promise<Product[]> {
    const rawProducts = await this.prisma.product.findMany()
    return rawProducts.map((rawProduct) =>
      PrismaProductMapper.toDomain(rawProduct),
    )
  }

  async update(product: Product): Promise<Product> {
    const { id, name, code, price, active } = product

    await this.prisma.product.update({
      where: { id },
      data: {
        name: name.value,
        code: code.value,
        active,
        price,
      },
    })

    const updatedProduct = await this.prisma.product.findUnique({
      where: { id },
    })

    if (!updatedProduct) {
      throw new ProductNotFound()
    }

    return PrismaProductMapper.toDomain(updatedProduct)
  }

  async findById(productId: string): Promise<Product | null> {
    const rawProduct = await this.prisma.product.findUnique({
      where: {
        id: productId,
      },
    })

    if (!rawProduct) {
      return null
    }

    return PrismaProductMapper.toDomain(rawProduct)
  }

  /**
   * Cria uma nova notificação.
   * @param product A notificação a ser criada.
   */
  async createProduct(product: Product): Promise<void> {
    const raw = PrismaProductMapper.toPrisma(product)
    await this.prisma.product.create({
      data: raw,
    })
  }

  /**
   * Atualiza uma notificação existente.
   * @param product A notificação a ser atualizada.
   */
  async save(product: Product): Promise<void> {
    const raw = PrismaProductMapper.toPrisma(product)

    await this.prisma.product.update({
      where: {
        id: raw.id,
      },
      data: raw,
    })
  }
}
