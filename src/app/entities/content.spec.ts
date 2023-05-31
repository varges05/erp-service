import { Content } from './content'

describe('Notification content', () => {
  it(' should be able to create a notification content', () => {
    // Cria um novo objeto Content com a string "Você recebeu uma nova solicitação de amizade!"
    const content = new Content('Você recebeu uma nova solicitação de amizade!')

    // Verifica se o objeto Content foi criado corretamente
    expect(content).toBeTruthy()
  })

  it('must not be possible to create the notification concept with less than 5 characters', () => {
    // Tenta criar um novo objeto Content com a string "aaa"
    expect(() => new Content('aaa')).toThrow()
  })

  it('must not be possible to create the notification concept with more than 240 characters', () => {
    // Tenta criar um novo objeto Content com uma string com mais de 240 caracteres
    expect(() => new Content('a'.repeat(241))).toThrow()
  })
})
