import { Module } from '@nestjs/common'
import { SaveSeller } from '@app/use-cases/seller/save-seller'
import { SellerController } from './controllers/seller.controller'
import { GetSeller } from '@app/use-cases/seller/get-seller'
import { DatabaseModule } from '../database/database.module'
import { UpdateSeller } from '@app/use-cases/seller/update-seller'
import { ListSeller } from '@app/use-cases/seller/list-seller'

@Module({
  imports: [DatabaseModule],
  controllers: [SellerController],
  providers: [SaveSeller, GetSeller, UpdateSeller, ListSeller],
})
export class HTTPModuleSeller {}
