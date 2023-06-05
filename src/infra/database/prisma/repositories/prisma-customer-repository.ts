/* eslint-disable no-useless-constructor */
import { Injectable } from '@nestjs/common'
import { CustomersRepository } from '@app/repositories/customer-repository'
import { PrismaService } from '../prisma.service'
import { PrismaCustomerMapper } from '../mappers/prisma-customer-mapper'
import { Customer } from '@app/entities/customer/customer'
import { CustomerNotFound } from '@app/use-cases/errors/customer-not-found'

@Injectable()
export class PrismaCustomerRepository implements CustomersRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Customer[]> {
    const rawCustomers = await this.prisma.customer.findMany()
    return rawCustomers.map(PrismaCustomerMapper.toDomain)
  }

  async update(customer: Customer): Promise<Customer> {
    const { id, name, active, email, phone } = customer

    const updatedCustomer = await this.prisma.customer.update({
      where: { id },
      data: {
        name: name.value,
        phone: phone.value,
        email,
        active,
      },
    })

    if (!updatedCustomer) {
      throw new CustomerNotFound()
    }

    return PrismaCustomerMapper.toDomain(updatedCustomer)
  }

  async findById(customerId: string): Promise<Customer | null> {
    const rawCustomer = await this.prisma.customer.findUnique({
      where: {
        id: customerId,
      },
    })

    if (!rawCustomer) {
      return null
    }

    return PrismaCustomerMapper.toDomain(rawCustomer)
  }

  async create(customer: Customer): Promise<void> {
    const raw = PrismaCustomerMapper.toPrisma(customer)
    await this.prisma.customer.create({
      data: raw,
    })
  }

  async save(customer: Customer): Promise<void> {
    const raw = PrismaCustomerMapper.toPrisma(customer)

    await this.prisma.customer.update({
      where: {
        id: raw.id,
      },
      data: raw,
    })
  }
}
