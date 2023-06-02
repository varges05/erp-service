import { Module } from '@nestjs/common'
import { HTTPModuleCategory } from './infra/http/category-http.module'
import { HTTPModuleNotification } from './infra/http/notification-http.module'
import { DatabaseModuleNotification } from './infra/database/notification-database.module'
import { DatabaseModuleCategory } from './infra/database/category-database.module'

@Module({
  imports: [
    HTTPModuleNotification,
    DatabaseModuleNotification,
    DatabaseModuleCategory,
    HTTPModuleCategory,
  ],
})
export class AppModule {}
