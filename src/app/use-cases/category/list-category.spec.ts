import { InMemoryCategoryRepository } from '@test/repositories/in-memory-category-repository'
import { ListCategory } from './list-category'
import { SaveCategory } from './save-category'

describe('ListCategory', () => {
  it('should return all categories', async () => {
    // Criação de uma instância do repositório de categorias em memória
    const categoryRepository = new InMemoryCategoryRepository()

    // Criação de uma instância do SaveCategory, passando o repositório de notificações
    const saveCategory = new SaveCategory(categoryRepository)

    // Populando o repositório com algumas categorias fictícias
    const category1 = {
      name: 'Category 1',
      abbreviation: 'C1',
      active: true,
    }
    const category2 = {
      name: 'Category 2',
      abbreviation: 'C2',
      active: true,
    }
    await saveCategory.execute(category1)
    await saveCategory.execute(category2)

    // Criação de uma instância do ListCategory, passando o repositório de categorias
    const listCategory = new ListCategory(categoryRepository)

    // Chamada do método getAll para obter todas as categorias
    const categories = await listCategory.getAll()

    // Verificação se o número de categorias retornadas é igual ao número de categorias no repositório
    expect(categories.length).toEqual(2)
  })
})
