/* eslint-disable no-useless-constructor */
import { UsersRepository } from '@app/repositories/user-repository'
import { UserViewModel } from '@helpers/infra/http/view-models/user-view-model'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ListUser {
  constructor(private userRepository: UsersRepository) {}

  async getAll() {
    const users = await this.userRepository.findAll()
    return users.map((user) => UserViewModel.toHTTP(user))
  }
}
