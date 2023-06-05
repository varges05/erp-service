import { Replace } from 'src/helpers/Replace'
import { Name } from './name'
import { randomUUID } from 'node:crypto'
import { Code } from './code'
import { Decimal } from '@prisma/client/runtime'

export interface ProductProps {
  name: Name
  code: Code
  price: Decimal | number
  active: boolean
  updatedAt?: Date | null
  createAt: Date
}

export class Product {
  private _id: string
  private props: ProductProps
  categories: any

  // Construtor da classe Product
  constructor(props: Replace<ProductProps, { createAt?: Date }>, id?: string) {
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
  public set active(active: boolean) {
    this.props.active = active
  }

  // Getter para o conteúdo da notificação
  public get active(): boolean {
    return this.props.active
  }

  // Setter para a categoria da notificação
  public set price(price: Decimal | number) {
    this.props.price = price
  }

  // Getter para a categoria da notificação
  public get price(): Decimal | number {
    return this.props.price
  }

  // Setter para a categoria da notificação
  public set code(code: Code) {
    this.props.code = code
  }

  // Getter para a categoria da notificação
  public get code(): Code {
    return this.props.code
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
