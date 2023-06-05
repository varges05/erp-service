import { Customer } from '../entities/customer/customer'

export abstract class CustomersRepository {
  abstract create(customer: Customer): Promise<void>
  abstract findById(customerId: string): Promise<Customer | null>
  abstract update(customer: Customer): Promise<Customer>
  abstract findAll(): Promise<Customer[]>
}
