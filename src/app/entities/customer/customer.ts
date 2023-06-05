import { Replace } from 'src/helpers/Replace'
import { Name } from './name'
import { randomUUID } from 'node:crypto'
import { Phone } from './phone'

export interface CustomerProps {
  name: Name
  email: string
  phone: Phone
  active: boolean
  updatedAt?: Date | null
  createAt: Date
}

export class Customer {
  private _id: string
  private props: CustomerProps

  // Construtor da classe Customer
  constructor(props: Replace<CustomerProps, { createAt?: Date }>, id?: string) {
    // Se id for fornecido, atribui ao _id, caso contrário, gera um UUID único
    this._id = id ?? randomUUID()

    // Define as propriedades da notificação
    this.props = {
      ...props,
      createAt: props.createAt ?? new Date(), // Define a data de criação como a data atual, caso não seja fornecida
    }
  }

  // Getter para o ID da notificação
  public get id() {
    return this._id
  }

  // Setter para o conteúdo da notificação
  public set name(name: Name) {
    this.props.name = name
  }

  // Getter para o conteúdo da notificação
  public get name(): Name {
    return this.props.name
  }

  // Setter para o conteúdo da notificação
  public set email(email: string) {
    this.props.email = email
  }

  // Getter para o conteúdo da notificação
  public get email(): string {
    return this.props.email
  }

  // Setter para o conteúdo da notificação
  public set phone(phone: Phone) {
    this.props.phone = phone
  }

  // Getter para o conteúdo da notificação
  public get phone(): Phone {
    return this.props.phone
  }

  // Setter para o conteúdo da notificação
  public set active(active: boolean) {
    this.props.active = active
  }

  // Getter para o conteúdo da notificação
  public get active(): boolean {
    return this.props.active
  }

  public updated() {
    this.props.updatedAt = new Date()
  }

  // Getter para a data de cancelamento da notificação
  public get updatedAt(): Date | null | undefined {
    return this.props.updatedAt
  }

  // Getter para a data de criação da notificação
  public get createdAt(): Date {
    return this.props.createAt
  }
}
