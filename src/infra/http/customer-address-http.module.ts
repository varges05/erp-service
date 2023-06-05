import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'
import { SaveCustomerAddress } from '@app/use-cases/address/save-customer-address'

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [SaveCustomerAddress],
})
export class HTTPModuleCustomerAddress {}
