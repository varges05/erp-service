import { User } from '../entities/user/user'

export abstract class UsersRepository {
  abstract create(user: User): Promise<void>
  abstract findById(userId: string): Promise<User | null>
  abstract update(user: User): Promise<User>
  abstract findAll(): Promise<User[]>
}
