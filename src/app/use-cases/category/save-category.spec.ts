import { InMemoryCategoryRepository } from '@test/repositories/in-memory-category-repository'
import { SaveCategory } from './save-category'

describe('SaveCategory', () => {
  it('should be able to save a category', async () => {
    // Criação de uma instância do repositório de notificações em memória
    const categoryRepository = new InMemoryCategoryRepository()

    // Criação de uma instância do SaveCategory, passando o repositório de notificações
    const saveCategory = new SaveCategory(categoryRepository)

    // Chamada do método execute para enviar uma notificação e aguardando a resposta
    const { category } = await saveCategory.execute({
      name: 'New category',
      abbreviation: 'NC',
      active: true,
    })

    // Verificação do tamanho do array de notificações no repositório
    expect(categoryRepository.categories).toHaveLength(1)

    // Verificação se a notificação armazenada é igual à notificação retornada pelo método execute
    expect(categoryRepository.categories[0]).toEqual(category)
  })
})
