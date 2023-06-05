import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'
import { SaveProductCategory } from '@app/use-cases/product/save-product-category'

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [SaveProductCategory],
})
export class HTTPModuleProductCategory {}
