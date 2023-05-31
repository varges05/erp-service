/* eslint-disable no-useless-constructor */
import { Injectable } from '@nestjs/common'
import { Notification } from '@app/entities/notification'
import { NotificationsRepository } from '@app/repositories/notification-repository'
import { PrismaService } from '../prisma.service'
import { PrismaNotificationMapper } from '../mappers/prisma-notification-mapper'

@Injectable()
export class PrismaNotificationRepository implements NotificationsRepository {
  constructor(private prisma: PrismaService) {}

  /**
   * Busca uma notificação pelo ID.
   * @param notificationId O ID da notificação.
   * @returns A notificação encontrada ou null se não encontrada.
   */
  async findById(notificationId: string): Promise<Notification | null> {
    const notification = await this.prisma.notification.findUnique({
      where: {
        id: notificationId,
      },
    })
    if (!notification) {
      return null
    }

    // Mapeia a notificação retornada pelo Prisma para a entidade Notification do domínio
    return PrismaNotificationMapper.toDomain(notification)
  }

  /**
   * Busca várias notificações pelo ID do destinatário.
   * @param recipientId O ID do destinatário.
   * @returns Uma lista de notificações encontradas.
   */
  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    const notifications = await this.prisma.notification.findMany({
      where: {
        recipientId,
      },
    })

    // Mapeia as notificações retornadas pelo Prisma para a entidade Notification do domínio
    return notifications.map(PrismaNotificationMapper.toDomain)
  }

  /**
   * Conta o número de notificações pelo ID do destinatário.
   * @param recipientId O ID do destinatário.
   * @returns O número de notificações encontradas.
   */
  async countManyByRecipientId(recipientId: string): Promise<number> {
    const count = await this.prisma.notification.count({
      where: {
        recipientId,
      },
    })
    return count
  }

  /**
   * Cria uma nova notificação.
   * @param notification A notificação a ser criada.
   */
  async create(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification)
    await this.prisma.notification.create({
      data: raw,
    })
  }

  /**
   * Atualiza uma notificação existente.
   * @param notification A notificação a ser atualizada.
   */
  async save(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification)

    await this.prisma.notification.update({
      where: {
        id: raw.id,
      },
      data: raw,
    })
  }
}
