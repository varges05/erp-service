import { InMemoryCategoryRepository } from '@test/repositories/in-memory-category-repository'
import { makeCategory } from '@test/factories/category-factory'
import { GetCategory } from './get-category'
import { CategoryNotFound } from '../errors/category-not-found'

describe('Get Category', () => {
  let categoryRepository: InMemoryCategoryRepository
  let getCategory: GetCategory

  beforeEach(() => {
    categoryRepository = new InMemoryCategoryRepository()
    getCategory = new GetCategory(categoryRepository)
  })

  it('should get a category by ID', async () => {
    // Cria uma categoria de teste
    const category = makeCategory()

    // Cria a categoria no repositório
    await categoryRepository.create(category)

    // Chama o método 'execute' para buscar a categoria pelo ID
    const result = await getCategory.execute({ categoryId: category.id })

    // Verifica se a categoria retornada é a mesma da categoria criada
    expect(result.category).toEqual(category)
  })

  it('should throw CategoryNotFound if category is not found', async () => {
    // Chama o método 'execute' para buscar uma categoria inexistente
    const executePromise = getCategory.execute({
      categoryId: 'non-existent-id',
    })

    // Verifica se a função lançou um erro CategoryNotFound
    await expect(executePromise).rejects.toThrow(CategoryNotFound)
  })
})
