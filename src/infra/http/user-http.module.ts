import { Module } from '@nestjs/common'
import { SaveUser } from '@app/use-cases/user/save-user'
import { UserController } from './controllers/user.controller'
import { GetUser } from '@app/use-cases/user/get-user'
import { DatabaseModule } from '../database/database.module'
import { UpdateUser } from '@app/use-cases/user/update-user'
import { ListUser } from '@app/use-cases/user/list-user'

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [SaveUser, GetUser, UpdateUser, ListUser],
})
export class HTTPModuleUser {}
