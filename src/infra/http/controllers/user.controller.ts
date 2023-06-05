/* eslint-disable no-useless-constructor */
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common'
import { CreateUserBody } from '../dtos/create.user.body'
import { SaveUser } from '@app/use-cases/user/save-user'
import { UserViewModel } from '../view-models/user-view-model'
import { GetUser } from '@app/use-cases/user/get-user'
import { UpdateUser } from '@app/use-cases/user/update-user'
import { ListUser } from '@app/use-cases/user/list-user'

@Controller('users')
export class UserController {
  constructor(
    private saveUser: SaveUser,
    private getUser: GetUser,
    private updateUser: UpdateUser,
    private listUser: ListUser,
  ) {}

  @Get()
  async getAllUsers() {
    const users = await this.listUser.getAll()
    return {
      users,
    }
  }

  @Patch('update/:id')
  async update(@Body() body: CreateUserBody, @Param('id') userId: string) {
    const { name, active, email } = body
    const user = await this.updateUser.execute({
      userId,
      name,
      email,
      active,
    })
    return {
      user: UserViewModel.toHTTP(user),
    }
  }

  @Get('from/:userId')
  async getFromUser(@Param('userId') userId: string) {
    const { user } = await this.getUser.execute({
      userId,
    })
    return {
      user: UserViewModel.toHTTP(user),
    }
  }

  @Post()
  async create(@Body() body: CreateUserBody) {
    const { name, email, password, active } = body

    const { user } = await this.saveUser.execute({
      name,
      password,
      email,
      active,
    })
    return {
      user: UserViewModel.toHTTP(user),
    }
  }
}
