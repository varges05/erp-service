import { Customer as RawCustomer } from '@prisma/client'
import { Customer } from '@app/entities/customer/customer'
import { Name } from '@app/entities/customer/name'
import { Phone } from '@app/entities/customer/phone'

export class PrismaCustomerMapper {
  static toPrisma(customer: Customer) {
    return {
      id: customer.id,
      name: customer.name.value,
      email: customer.email,
      phone: customer.phone.value,
      active: customer.active,
      updatedAt: customer.updatedAt,
    }
  }

  static toDomain(raw: RawCustomer): Customer {
    return new Customer(
      {
        name: new Name(raw.name),
        phone: new Phone(raw.phone),
        active: raw.active,
        email: raw.email,
        updatedAt: raw.updatedAt,
        createAt: raw.createdAt,
      },
      raw.id,
    )
  }
}
