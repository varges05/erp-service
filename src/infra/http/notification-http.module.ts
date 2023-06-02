import { Module } from '@nestjs/common'
import { NotificationController } from './controllers/notification.controller'
import { SendNotification } from '@app/use-cases/send-notification'
import { CancelNotification } from '@app/use-cases/cancel.notification'
import { CountRecipientNotification } from '@app/use-cases/count-recipient-notification'
import { GetRecipientNotification } from '@app/use-cases/get-recipient-notifications'
import { ReadNotification } from '@app/use-cases/read-notification'
import { UnreadNotification } from '@app/use-cases/unread-notification'
import { DatabaseModuleNotification } from '../database/notification-database.module'

@Module({
  imports: [DatabaseModuleNotification],
  controllers: [NotificationController],
  providers: [
    SendNotification,
    CancelNotification,
    CountRecipientNotification,
    GetRecipientNotification,
    ReadNotification,
    UnreadNotification,
  ],
})
export class HTTPModuleNotification {}
