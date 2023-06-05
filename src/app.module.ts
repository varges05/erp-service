import { Module } from '@nestjs/common'
import { DatabaseModule } from './infra/database/database.module'
import { HTTPModuleCategory } from './infra/http/category-http.module'
import { HTTPModuleProduct } from './infra/http/product-http.module'
import { HTTPModuleProductCategory } from './infra/http/product-category-http.module'
import { HTTPModuleUser } from './infra/http/user-http.module'
import { HTTPModuleSeller } from './infra/http/seller-http.module'
import { HTTPModuleCustomer } from './infra/http/customer-http.module'
import { HTTPModuleAddress } from './infra/http/address-http.module'
import { HTTPModuleCustomerAddress } from './infra/http/customer-address-http.module'

@Module({
  imports: [
    DatabaseModule,
    HTTPModuleCategory,
    HTTPModuleProduct,
    HTTPModuleProductCategory,
    HTTPModuleCustomerAddress,
    HTTPModuleUser,
    HTTPModuleSeller,
    HTTPModuleCustomer,
    HTTPModuleAddress,
  ],
})
export class AppModule {}
