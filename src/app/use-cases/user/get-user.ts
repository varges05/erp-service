/* eslint-disable no-useless-constructor */
import { UsersRepository } from '@app/repositories/user-repository'
import { Injectable } from '@nestjs/common'
import { UserNotFound } from '../errors/user-not-found'
import { User } from '@app/entities/user/user'

interface GetUserRequest {
  userId: string
}

interface GetUserResponse {
  user: User
}

@Injectable()
export class GetUser {
  constructor(private userRepository: UsersRepository) {}

  async execute(request: GetUserRequest): Promise<GetUserResponse> {
    const { userId } = request

    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new UserNotFound()
    }
    return {
      user,
    }
  }
}
