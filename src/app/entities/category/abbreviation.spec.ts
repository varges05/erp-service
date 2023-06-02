import { Abbreviation } from './abbreviation'

describe('Category abbreviation', () => {
  it(' should be able to create a category abbreviation', () => {
    // Cria um novo objeto Abbreviation com a string "Você recebeu uma nova solicitação de amizade!"
    const abbreviation = new Abbreviation('NC')

    // Verifica se o objeto Abbreviation foi criado corretamente
    expect(abbreviation).toBeTruthy()
  })

  it('must not be possible to create the abbreviation concept with less than 2 characters', () => {
    // Tenta criar um novo objeto Abbreviation com a string "a"
    expect(() => new Abbreviation('a')).toThrow()
  })

  it('must not be possible to create the abbreviation concept with more than 4 characters', () => {
    // Tenta criar um novo objeto Abbreviation com uma string com mais de 4 caracteres
    expect(() => new Abbreviation('a'.repeat(5))).toThrow()
  })
})
