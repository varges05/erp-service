/* eslint-disable no-useless-constructor */
import { CustomersRepository } from '@app/repositories/customer-repository'
import { Injectable } from '@nestjs/common'
import { CustomerNotFound } from '../errors/customer-not-found'
import { Customer } from '@app/entities/customer/customer'

interface GetCustomerRequest {
  customerId: string
}

interface GetCustomerResponse {
  customer: Customer
}

@Injectable()
export class GetCustomer {
  constructor(private customerRepository: CustomersRepository) {}

  async execute(request: GetCustomerRequest): Promise<GetCustomerResponse> {
    const { customerId } = request

    const customer = await this.customerRepository.findById(customerId)

    if (!customer) {
      throw new CustomerNotFound()
    }
    return {
      customer,
    }
  }
}
