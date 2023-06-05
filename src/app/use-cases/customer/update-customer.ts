/* eslint-disable no-useless-constructor */
import { CustomersRepository } from '@app/repositories/customer-repository'
import { Injectable } from '@nestjs/common'
import { Name } from '@app/entities/customer/name'
import { Customer } from '@app/entities/customer/customer'
import { CustomerNotFound } from '../errors/customer-not-found'
import { Phone } from '@app/entities/customer/phone'

export interface UpdateCustomerRequest {
  customerId: string
  name: string
  phone: string
  email: string
  active: boolean
  updatedAt?: Date
}

@Injectable()
export class UpdateCustomer {
  constructor(private customerRepository: CustomersRepository) {}

  async execute(request: UpdateCustomerRequest): Promise<Customer> {
    const { customerId, name, active, email, phone } = request

    // Verificar se a categoria existe no repositório
    const existingCustomer = await this.customerRepository.findById(customerId)
    if (!existingCustomer) {
      throw new CustomerNotFound()
    }

    // Atualizar os dados da categoria existente
    existingCustomer.name = new Name(name)
    existingCustomer.active = active
    existingCustomer.email = email
    existingCustomer.phone = new Phone(phone)
    existingCustomer.updated()

    // Chamar o método update do customerRepository para salvar as alterações
    const updatedCustomer = await this.customerRepository.update(
      existingCustomer,
    )
    if (!updatedCustomer) {
      throw new CustomerNotFound()
    }

    return updatedCustomer
  }
}
