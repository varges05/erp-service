/* eslint-disable no-useless-constructor */
import { CustomersRepository } from '@app/repositories/customer-repository'
import { CustomerViewModel } from '@helpers/infra/http/view-models/customer-view-model'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ListCustomer {
  constructor(private customerRepository: CustomersRepository) {}

  async getAll() {
    const customers = await this.customerRepository.findAll()
    return customers.map((customer) => CustomerViewModel.toHTTP(customer))
  }
}
