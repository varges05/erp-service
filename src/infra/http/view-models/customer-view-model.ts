import { Customer } from '@app/entities/customer/customer'

export class CustomerViewModel {
  static toHTTP(customer: Customer) {
    return {
      id: customer.id,
      name: customer.name.value,
      phone: customer.phone.value,
      email: customer.email,
      active: customer.active,
    }
  }
}
