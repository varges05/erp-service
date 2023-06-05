/* eslint-disable no-useless-constructor */
import { Injectable } from '@nestjs/common'
import { CategoriesRepository } from '@app/repositories/category-repository'
import { PrismaService } from '../prisma.service'
import { PrismaCategoryMapper } from '../mappers/prisma-category-mapper'
import { Category } from '@app/entities/category/category'
import { CategoryNotFound } from '@app/use-cases/errors/category-not-found'

@Injectable()
export class PrismaCategoryRepository implements CategoriesRepository {
  constructor(private prisma: PrismaService) {}

  async getCategoriesByProductId(productId: string): Promise<Category[]> {
    const categories = await this.prisma.category.findMany({
      where: {
        ProductCategory: {
          some: {
            productId,
          },
        },
      },
    })

    return categories.map(PrismaCategoryMapper.toDomain)
  }

  async findAll(): Promise<Category[]> {
    const rawCategories = await this.prisma.category.findMany()
    return rawCategories.map(PrismaCategoryMapper.toDomain)
  }

  async update(category: Category): Promise<Category> {
    const { id, name, abbreviation, active } = category

    const updatedCategory = await this.prisma.category.update({
      where: { id },
      data: {
        name: name.value,
        abbreviation: abbreviation.value,
        active,
      },
    })

    if (!updatedCategory) {
      throw new CategoryNotFound()
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

  async create(category: Category): Promise<void> {
    const raw = PrismaCategoryMapper.toPrisma(category)
    await this.prisma.category.create({
      data: raw,
    })
  }

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
