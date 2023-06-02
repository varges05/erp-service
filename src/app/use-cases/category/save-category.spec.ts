import { InMemoryCategoryRepository } from '@test/repositories/in-memory-category-repository'
import { SaveCategory } from './save-category'

describe('Save category', () => {
  it('should be able to save a category', async () => {
    // Criação de uma instância do repositório de notificações em memória
    const categoryRepository = new InMemoryCategoryRepository()

    // Criação de uma instância do SaveCategory, passando o repositório de notificações
    const saveCategory = new SaveCategory(categoryRepository)

    // Chamada do método execute para enviar uma notificação e aguardando a resposta
    const { category } = await saveCategory.execute({
      name: 'New Category',
      abbreviation: 'NC',
      active: true,
    })

    // Verificação do tamanho do array de notificações no repositório
    expect(categoryRepository.categories).toHaveLength(1)

    // Verificação se a notificação armazenada é igual à notificação retornada pelo método execute
    expect(categoryRepository.categories[0]).toEqual(category)

    // Verificação se os dados da categoria foram atualizados corretamente
    expect(categoryRepository.categories[0].name.value).toEqual('New Category')
    expect(categoryRepository.categories[0].abbreviation.value).toEqual('NC')
    expect(categoryRepository.categories[0].active).toEqual(true)
  })
})
