import { Module } from '@nestjs/common'
import { SaveProduct } from '@app/use-cases/product/save-product'
import { ProductController } from './controllers/product.controller'
import { GetProduct } from '@app/use-cases/product/get-product'
import { DatabaseModule } from '../database/database.module'
import { UpdateProduct } from '@app/use-cases/product/update-product'
import { ListProduct } from '@app/use-cases/product/list-product'

@Module({
  imports: [DatabaseModule],
  controllers: [ProductController],
  providers: [SaveProduct, GetProduct, UpdateProduct, ListProduct],
})
export class HTTPModuleProduct {}
