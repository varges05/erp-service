import { Name } from './name'

describe('Category name', () => {
  it(' should be able to create a category name', () => {
    // Cria um novo objeto Name com a string "Você recebeu uma nova solicitação de amizade!"
    const name = new Name('New category')

    // Verifica se o objeto Name foi criado corretamente
    expect(name).toBeTruthy()
  })

  it('must not be possible to create the category concept with less than 3 characters', () => {
    // Tenta criar um novo objeto Name com a string "c"
    expect(() => new Name('ca')).toThrow()
  })

  it('must not be possible to create the category concept with more than 20 characters', () => {
    // Tenta criar um novo objeto Name com uma string com mais de 20 caracteres
    expect(() => new Name('c'.repeat(21))).toThrow()
  })
})
