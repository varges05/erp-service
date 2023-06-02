import { Abbreviation } from '@app/entities/category/abbreviation'
import { Category, CategoryProps } from '@app/entities/category/category'
import { Name } from '@app/entities/category/name'

type Override = Partial<CategoryProps>

export function makeCategory(override: Override = {}) {
  return new Category({
    name: new Name('New category'),
    abbreviation: new Abbreviation('NC'),
    active: true,
    ...override,
  })
}
