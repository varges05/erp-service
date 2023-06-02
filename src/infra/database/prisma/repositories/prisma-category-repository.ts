/* eslint-disable no-useless-constructor */
import { Injectable } from '@nestjs/common'
import { CategoriesRepository } from '@app/repositories/category-repository'
import { PrismaService } from '../prisma.service'
import { PrismaCategoryMapper } from '../mappers/prisma-category-mapper'
import { Category } from '@app/entities/category/category'
import { NotificationNotFound } from '@app/use-cases/errors/notification-not-found'

@Injectable()
export class PrismaCategoryRepository implements CategoriesRepository {
  constructor(private prisma: PrismaService) {}
  async findAll(): Promise<Category[]> {
    const rawCategories = await this.prisma.category.findMany()
    return rawCategories.map((rawCategory) =>
      PrismaCategoryMapper.toDomain(rawCategory),
    )
  }

  async listAll(): Promise<Category[]> {
    const rawCategories = await this.prisma.category.findMany()
    return rawCategories.map((rawCategory) =>
      PrismaCategoryMapper.toDomain(rawCategory),
    )
  }

  async update(category: Category): Promise<Category> {
    const { id, name, abbreviation, active } = category

    await this.prisma.category.update({
      where: { id },
      data: {
        name: name.value,
        abbreviation: abbreviation.value,
        active,
      },
    })

    const updatedCategory = await this.prisma.category.findUnique({
      where: { id },
    })

    if (!updatedCategory) {
      throw new NotificationNotFound()
    }

    return PrismaCategoryMapper.toDomain(updatedCategory)
  }

  async findById(categoryId: string): Promise<Category | null> {
    const rawCategory = await this.prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    })

    if (!rawCategory) {
      return null
    }

    return PrismaCategoryMapper.toDomain(rawCategory)
  }

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
