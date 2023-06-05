/* eslint-disable no-useless-constructor */
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common'
import { CreateCustomerBody } from '../dtos/create.customer.body'
import { SaveCustomer } from '@app/use-cases/customer/save-customer'
import { CustomerViewModel } from '../view-models/customer-view-model'
import { GetCustomer } from '@app/use-cases/customer/get-customer'
import { UpdateCustomer } from '@app/use-cases/customer/update-customer'
import { ListCustomer } from '@app/use-cases/customer/list-customer'

@Controller('customers')
export class CustomerController {
  constructor(
    private saveCustomer: SaveCustomer,
    private getCustomer: GetCustomer,
    private updateCustomer: UpdateCustomer,
    private listCustomer: ListCustomer,
  ) {}

  @Get()
  async getAllCustomers() {
    const customers = await this.listCustomer.getAll()
    return {
      customers,
    }
  }

  @Patch('update/:id')
  async update(
    @Body() body: CreateCustomerBody,
    @Param('id') customerId: string,
  ) {
    const { name, active, email, phone } = body
    const customer = await this.updateCustomer.execute({
      customerId,
      name,
      phone,
      email,
      active,
    })
    return {
      customer: CustomerViewModel.toHTTP(customer),
    }
  }

  @Get('from/:customerId')
  async getFromCustomer(@Param('customerId') customerId: string) {
    const { customer } = await this.getCustomer.execute({
      customerId,
    })
    return {
      customer: CustomerViewModel.toHTTP(customer),
    }
  }

  @Post()
  async create(@Body() body: CreateCustomerBody) {
    const { name, email, active, phone } = body

    const { customer } = await this.saveCustomer.execute({
      name,
      phone,
      email,
      active,
    })
    return {
      customer: CustomerViewModel.toHTTP(customer),
    }
  }
}
