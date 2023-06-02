import { Category as RawCategory } from '@prisma/client'
import { Category } from '@app/entities/category/category'
import { Name } from '@app/entities/category/name'
import { Abbreviation } from '@app/entities/category/abbreviation'

export class PrismaCategoryMapper {
  static toPrisma(category: Category) {
    return {
      id: category.id,
      abbreviation: category.abbreviation.value,
      name: category.name.value,
      active: category.active,
      updatedAt: category.updatedAt,
    }
  }

  static toDomain(raw: RawCategory): Category {
    return new Category(
      {
        name: new Name(raw.name),
        abbreviation: new Abbreviation(raw.abbreviation),
        active: raw.active,
        updatedAt: raw.updatedAt,
        createAt: raw.createdAt,
      },
      raw.id,
    )
  }
}
