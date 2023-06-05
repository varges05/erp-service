/* eslint-disable no-useless-constructor */
import { UsersRepository } from '@app/repositories/user-repository'
import { Injectable } from '@nestjs/common'
import { Name } from '@app/entities/user/name'
import { User } from '@app/entities/user/user'
import { UserNotFound } from '../errors/user-not-found'

export interface UpdateUserRequest {
  userId: string
  name: string
  email: string
  active: boolean
  updatedAt?: Date
}

@Injectable()
export class UpdateUser {
  constructor(private userRepository: UsersRepository) {}

  async execute(request: UpdateUserRequest): Promise<User> {
    const { userId, name, active, email } = request

    // Verificar se a categoria existe no repositório
    const existingUser = await this.userRepository.findById(userId)
    if (!existingUser) {
      throw new UserNotFound()
    }

    // Atualizar os dados da categoria existente
    existingUser.name = new Name(name)
    existingUser.active = active
    existingUser.email = email
    existingUser.updated()

    // Chamar o método update do userRepository para salvar as alterações
    const updatedUser = await this.userRepository.update(existingUser)
    if (!updatedUser) {
      throw new UserNotFound()
    }

    return updatedUser
  }
}
