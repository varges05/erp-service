/* eslint-disable no-useless-constructor */
import { Injectable } from '@nestjs/common'
import { Content } from '../entities/content'
import { Notification } from '../entities/notification'
import { NotificationsRepository } from '../repositories/notification-repository'

// Interface para a requisição de envio de notificação
interface SendNotificationRequest {
  recipientId: string
  content: string
  category: string
}

// Interface para a resposta do envio de notificação
interface SendNotificationResponse {
  notification: Notification
}

@Injectable()
export class SendNotification {
  constructor(private notificationRepository: NotificationsRepository) {}

  // Método execute para enviar a notificação
  async execute(
    request: SendNotificationRequest,
  ): Promise<SendNotificationResponse> {
    const { recipientId, content, category } = request

    // Cria uma nova instância de Notification com os dados fornecidos
    const notification = new Notification({
      recipientId,
      content: new Content(content),
      category,
    })

    // Chama o método create do notificationRepository para persistir a notificação
    await this.notificationRepository.create(notification)

    // Retorna a notificação como parte da resposta
    return {
      notification,
    }
  }
}
