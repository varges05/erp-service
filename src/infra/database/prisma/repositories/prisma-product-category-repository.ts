/* eslint-disable no-useless-constructor */
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { ProductsCategoriesRepository } from '@app/repositories/product-category-repository'
import { ProductCategory } from '@prisma/client'

@Injectable()
export class PrismaProductCategoryRepository
  implements ProductsCategoriesRepository
{
  constructor(private prisma: PrismaService) {}

  async deleteProductCategory(
    productId: string,
    categoryId: string,
  ): Promise<void> {
    await this.prisma.productCategory.deleteMany({
      where: {
        productId,
        categoryId,
      },
    })
  }

  async findByProductId(productId: string): Promise<ProductCategory[]> {
    return this.prisma.productCategory.findMany({
      where: {
        productId,
      },
    })
  }

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

  async getProductCategoriesByProductId(
    productId: string,
  ): Promise<ProductCategory[]> {
    return this.prisma.productCategory.findMany({
      where: {
        productId,
      },
    })
  }
}
