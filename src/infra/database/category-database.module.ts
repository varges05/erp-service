import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { CategoriesRepository } from '@app/repositories/category-repository'
import { PrismaCategoryRepository } from './prisma/repositories/prisma-category-repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: CategoriesRepository,
      useClass: PrismaCategoryRepository,
    },
  ],
  exports: [CategoriesRepository],
})
export class DatabaseModuleCategory {}
