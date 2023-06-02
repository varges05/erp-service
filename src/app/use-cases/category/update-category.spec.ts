import { InMemoryCategoryRepository } from '@test/repositories/in-memory-category-repository'
import { UpdateCategory } from './update-category'
import { SaveCategory } from './save-category'

describe('UpdateCategory', () => {
  it('should update a category', async () => {
    // Criação de uma instância do repositório de categorias em memória
    const categoryRepository = new InMemoryCategoryRepository()

    // Criação de uma instância do SaveCategory, passando o repositório de categorias
    const saveCategory = new SaveCategory(categoryRepository)

    // Populando o repositório com uma categoria fictícia
    const category = {
      name: 'Old Category',
      abbreviation: 'OC',
      active: true,
    }
    const savedCategory = await saveCategory.execute(category)

    // Criação de uma instância do UpdateCategory, passando o repositório de categorias
    const updateCategory = new UpdateCategory(categoryRepository)

    // Atualização dos dados da categoria
    const updatedCategory = await updateCategory.execute({
      categoryId: savedCategory.category.id,
      name: 'New Category',
      abbreviation: 'NC',
      active: false,
    })

    // ...

    // Verificação se os dados da categoria foram atualizados corretamente
    expect(updatedCategory.name.value).toEqual('New Category')
    expect(updatedCategory.abbreviation.value).toEqual('NC')
    expect(updatedCategory.active).toEqual(false)

    // ...
  })
})
