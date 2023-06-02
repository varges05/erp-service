import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { NotificationsRepository } from '@app/repositories/notification-repository'
import { PrismaNotificationRepository } from './prisma/repositories/prisma-notification-repository'
import { CategoriesRepository } from '@app/repositories/category-repository'
import { PrismaCategoryRepository } from './prisma/repositories/prisma-category-repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: NotificationsRepository,
      useClass: PrismaNotificationRepository,
    },
    {
      provide: CategoriesRepository,
      useClass: PrismaCategoryRepository,
    },
  ],
  exports: [NotificationsRepository, CategoriesRepository],
})
export class DatabaseModule {}
