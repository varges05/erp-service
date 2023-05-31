import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notification-repository'
import { makeNotification } from '@test/factories/notification-factory'
import { GetRecipientNotification } from './get-recipient-notifications'

describe('Get recipient notifications', () => {
  it('should be able to get recipient notifications', async () => {
    // Cria uma instância do repositório de notificações em memória
    const notificationRepository = new InMemoryNotificationRepository()
    // Cria uma instância do contador de notificações para o destinatário
    const getRecipientNotification = new GetRecipientNotification(
      notificationRepository,
    )

    // Cria três notificações de teste para o destinatário 'recipient-1'
    await notificationRepository.create(
      makeNotification({ recipientId: 'recipient-1' }),
    )
    await notificationRepository.create(
      makeNotification({ recipientId: 'recipient-1' }),
    )
    await notificationRepository.create(
      makeNotification({ recipientId: 'recipient-2' }),
    )

    // Chama o método 'execute' para contar as notificações do destinatário 'recipient-1'
    const { notifications } = await getRecipientNotification.execute({
      recipientId: 'recipient-1',
    })

    expect(notifications).toHaveLength(2)
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'recipient-1' }),
        expect.objectContaining({ recipientId: 'recipient-1' }),
      ]),
    )
  })
})
