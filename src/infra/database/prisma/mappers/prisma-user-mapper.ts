import { User as RawUser } from '@prisma/client'
import { User } from '@app/entities/user/user'
import { Name } from '@app/entities/user/name'
import { Password } from '@app/entities/user/password'

export class PrismaUserMapper {
  static toPrisma(user: User) {
    return {
      id: user.id,
      name: user.name.value,
      password: user.password.value,
      email: user.email,
      active: user.active,
      updatedAt: user.updatedAt,
    }
  }

  static toDomain(raw: RawUser): User {
    return new User(
      {
        name: new Name(raw.name),
        password: new Password(raw.password),
        active: raw.active,
        email: raw.email,
        updatedAt: raw.updatedAt,
        createAt: raw.createdAt,
      },
      raw.id,
    )
  }
}
