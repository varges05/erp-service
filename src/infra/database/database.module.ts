import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { CategoriesRepository } from '@app/repositories/category-repository'
import { PrismaCategoryRepository } from './prisma/repositories/prisma-category-repository'
import { ProductsRepository } from '@app/repositories/product-repository'
import { PrismaProductRepository } from './prisma/repositories/prisma-product-repository'
import { ProductsCategoriesRepository } from '@app/repositories/product-category-repository'
import { PrismaProductCategoryRepository } from './prisma/repositories/prisma-product-category-repository'
import { UsersRepository } from '@app/repositories/user-repository'
import { PrismaUserRepository } from './prisma/repositories/prisma-user-repository'
import { SellersRepository } from '@app/repositories/seller-repository'
import { PrismaSellerRepository } from './prisma/repositories/prisma-seller-repository'
import { CustomersRepository } from '@app/repositories/customer-repository'
import { PrismaCustomerRepository } from './prisma/repositories/prisma-customer-repository'
import { AddressesRepository } from '@app/repositories/address-repository'
import { PrismaAddressRepository } from './prisma/repositories/prisma-address-repository'
import { PrismaCustomerAddressRepository } from './prisma/repositories/prisma-customer-address-repository'
import { AddressesCustomersRepository } from '@app/repositories/customer-address-repository'

@Module({
  providers: [
    PrismaService,

    {
      provide: CategoriesRepository,
      useClass: PrismaCategoryRepository,
    },
    {
      provide: ProductsRepository,
      useClass: PrismaProductRepository,
    },
    {
      provide: ProductsCategoriesRepository,
      useClass: PrismaProductCategoryRepository,
    },
    {
      provide: UsersRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: SellersRepository,
      useClass: PrismaSellerRepository,
    },
    {
      provide: CustomersRepository,
      useClass: PrismaCustomerRepository,
    },
    {
      provide: AddressesRepository,
      useClass: PrismaAddressRepository,
    },
    {
      provide: AddressesCustomersRepository,
      useClass: PrismaCustomerAddressRepository,
    },
  ],
  exports: [
    CategoriesRepository,
    ProductsRepository,
    ProductsCategoriesRepository,
    UsersRepository,
    SellersRepository,
    CustomersRepository,
    AddressesRepository,
    AddressesCustomersRepository,
  ],
})
export class DatabaseModule {}
