import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { NotificationsRepository } from '@app/repositories/notification-repository'
import { PrismaNotificationRepository } from './prisma/repositories/prisma-notification-repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: NotificationsRepository,
      useClass: PrismaNotificationRepository,
    },
  ],
  exports: [NotificationsRepository],
})
export class DatabaseModuleNotification {}
