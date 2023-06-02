import { Module } from '@nestjs/common'
import { SaveCategory } from '@app/use-cases/category/save-category'
import { CategoryController } from './controllers/category.controller'
import { DatabaseModuleCategory } from '../database/category-database.module'

@Module({
  imports: [DatabaseModuleCategory],
  controllers: [CategoryController],
  providers: [SaveCategory],
})
export class HTTPModuleCategory {}
