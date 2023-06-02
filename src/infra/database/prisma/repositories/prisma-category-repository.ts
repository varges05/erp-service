/* eslint-disable no-useless-constructor */
import { Injectable } from '@nestjs/common'
import { CategoriesRepository } from '@app/repositories/category-repository'
import { PrismaService } from '../prisma.service'
import { PrismaCategoryMapper } from '../mappers/prisma-category-mapper'
import { Category } from '@app/entities/category/category'

@Injectable()
export class PrismaCategoryRepository implements CategoriesRepository {
  constructor(private prisma: PrismaService) {}

  /**
   * Cria uma nova notificação.
   * @param category A notificação a ser criada.
   */
  async create(category: Category): Promise<void> {
    const raw = PrismaCategoryMapper.toPrisma(category)
    await this.prisma.category.create({
      data: raw,
    })
  }

  /**
   * Atualiza uma notificação existente.
   * @param category A notificação a ser atualizada.
   */
  async save(category: Category): Promise<void> {
    const raw = PrismaCategoryMapper.toPrisma(category)

    await this.prisma.category.update({
      where: {
        id: raw.id,
      },
      data: raw,
    })
  }
}
