import { Module } from '@nestjs/common'
import { SaveCategory } from '@app/use-cases/category/save-category'
import { CategoryController } from './controllers/category.controller'
import { GetCategory } from '@app/use-cases/category/get-category'
import { DatabaseModule } from '../database/database.module'
import { UpdateCategory } from '@app/use-cases/category/update-category'
import { ListCategory } from '@app/use-cases/category/list-category'

@Module({
  imports: [DatabaseModule],
  controllers: [CategoryController],
  providers: [SaveCategory, GetCategory, UpdateCategory, ListCategory],
})
export class HTTPModuleCategory {}
