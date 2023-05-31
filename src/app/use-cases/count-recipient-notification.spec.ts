import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notification-repository'
import { CountRecipientNotification } from './count-recipient-notification'
import { makeNotification } from '@test/factories/notification-factory'

describe('Count recipient notifications', () => {
  it('should be able to count recipient notifications', async () => {
    // Cria uma instância do repositório de notificações em memória
    const notificationRepository = new InMemoryNotificationRepository()
    // Cria uma instância do contador de notificações para o destinatário
    const countRecipientNotification = new CountRecipientNotification(
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
    const { count } = await countRecipientNotification.execute({
      recipientId: 'recipient-1',
    })

    // Verifica se o resultado retornado possui a propriedade 'count' igual a 2
    expect(count).toEqual(2)
  })

  it('should return zero when the recipient does not exist', async () => {
    // Cria uma instância do repositório de notificações em memória
    const notificationRepository = new InMemoryNotificationRepository()
    // Cria uma instância do contador de notificações para o destinatário
    const countRecipientNotification = new CountRecipientNotification(
      notificationRepository,
    )

    // Chama o método 'execute' para contar as notificações de um destinatário que não existe
    const { count } = await countRecipientNotification.execute({
      recipientId: 'non-existent-recipient',
    })

    // Verifica se o resultado retornado possui a propriedade 'count' igual a 0
    expect(count).toEqual(0)
  })
})
