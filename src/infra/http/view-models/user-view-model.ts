import { User } from '@app/entities/user/user'

export class UserViewModel {
  static toHTTP(user: User) {
    return {
      id: user.id,
      name: user.name.value,
      email: user.email,
      active: user.active,
    }
  }
}
