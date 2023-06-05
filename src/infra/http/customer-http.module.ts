import { Module } from '@nestjs/common'
import { SaveCustomer } from '@app/use-cases/customer/save-customer'
import { CustomerController } from './controllers/customer.controller'
import { GetCustomer } from '@app/use-cases/customer/get-customer'
import { DatabaseModule } from '../database/database.module'
import { UpdateCustomer } from '@app/use-cases/customer/update-customer'
import { ListCustomer } from '@app/use-cases/customer/list-customer'

@Module({
  imports: [DatabaseModule],
  controllers: [CustomerController],
  providers: [SaveCustomer, GetCustomer, UpdateCustomer, ListCustomer],
})
export class HTTPModuleCustomer {}
