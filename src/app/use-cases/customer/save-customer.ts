/* eslint-disable no-useless-constructor */
import { Phone } from '@app/entities/customer/phone'
import { Customer } from '@app/entities/customer/customer'
import { Name } from '@app/entities/customer/name'
import { CustomersRepository } from '@app/repositories/customer-repository'
import { Injectable } from '@nestjs/common'

// Interface para a requisição de envio de cliente
interface SaveCustomerRequest {
  name: string
  phone: string
  email: string
  active: boolean
}

// Interface para a resposta do envio de cliente
interface SaveCustomerResponse {
  customer: Customer
}

@Injectable()
export class SaveCustomer {
  constructor(private customerRepository: CustomersRepository) {}

  // Método execute para enviar a cliente
  async execute(request: SaveCustomerRequest): Promise<SaveCustomerResponse> {
    const { name, phone, active, email } = request

    // Cria uma nova instância de Customer com os dados fornecidos
    const customer = new Customer({
      name: new Name(name),
      phone: new Phone(phone),
      email,
      active,
    })

    // Chama o método create do customerRepository para persistir a cliente
    await this.customerRepository.create(customer)

    // Retorna a cliente como parte da resposta
    return {
      customer,
    }
  }
}
