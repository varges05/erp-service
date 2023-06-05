import { Module } from '@nestjs/common'
import { SaveAddress } from '@app/use-cases/address/save-address'
import { AddressController } from './controllers/address.controller'
import { GetAddress } from '@app/use-cases/address/get-address'
import { DatabaseModule } from '../database/database.module'
import { UpdateAddress } from '@app/use-cases/address/update-address'
import { ListAddress } from '@app/use-cases/address/list-address'

@Module({
  imports: [DatabaseModule],
  controllers: [AddressController],
  providers: [SaveAddress, GetAddress, UpdateAddress, ListAddress],
})
export class HTTPModuleAddress {}
