import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notification-repository'
import { SendNotification } from './send-notification'

describe('SendNotification', () => {
  it('should be able to send a notification', async () => {
    // Criação de uma instância do repositório de notificações em memória
    const notificationRepository = new InMemoryNotificationRepository()

    // Criação de uma instância do SendNotification, passando o repositório de notificações
    const sendNotification = new SendNotification(notificationRepository)

    // Chamada do método execute para enviar uma notificação e aguardando a resposta
    const { notification } = await sendNotification.execute({
      content: 'This is a notification',
      category: 'social',
      recipientId: '34ee34',
    })

    // Verificação do tamanho do array de notificações no repositório
    expect(notificationRepository.notifications).toHaveLength(1)

    // Verificação se a notificação armazenada é igual à notificação retornada pelo método execute
    expect(notificationRepository.notifications[0]).toEqual(notification)
  })
})
