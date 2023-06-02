import { Module } from '@nestjs/common'
import { HTTPModuleNotification } from './infra/http/notification-http.module'
import { DatabaseModule } from './infra/database/database.module'
import { HTTPModuleCategory } from './infra/http/category-http.module'

@Module({
  imports: [HTTPModuleNotification, DatabaseModule, HTTPModuleCategory],
})
export class AppModule {}
