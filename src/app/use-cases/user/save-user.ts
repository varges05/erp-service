/* eslint-disable no-useless-constructor */
import { Password } from '@app/entities/user/password'
import { User } from '@app/entities/user/user'
import { Name } from '@app/entities/user/name'
import { UsersRepository } from '@app/repositories/user-repository'
import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'

// Interface para a requisição de envio de usuario
interface SaveUserRequest {
  name: string
  password: string
  email: string
  active: boolean
}

// Interface para a resposta do envio de usuario
interface SaveUserResponse {
  user: User
}

@Injectable()
export class SaveUser {
  constructor(private userRepository: UsersRepository) {}

  // Método execute para enviar a usuario
  async execute(request: SaveUserRequest): Promise<SaveUserResponse> {
    const { name, password, active, email } = request

    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(password, 10)

    // Cria uma nova instância de User com os dados fornecidos
    const user = new User({
      name: new Name(name),
      password: new Password(hashedPassword),
      email,
      active,
    })

    // Chama o método create do userRepository para persistir a usuario
    await this.userRepository.create(user)

    // Retorna a usuario como parte da resposta
    return {
      user,
    }
  }
}
