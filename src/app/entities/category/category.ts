import { Replace } from 'src/helpers/Replace'
import { Name } from './name'
import { randomUUID } from 'node:crypto'
import { Abbreviation } from './abbreviation'

export interface CategoryProps {
  name: Name
  abbreviation: Abbreviation
  active: boolean
  updatedAt?: Date | null
  createAt: Date
}

export class Category {
  private _id: string
  private props: CategoryProps

  // Construtor da classe Category
  constructor(props: Replace<CategoryProps, { createAt?: Date }>, id?: string) {
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
  public set abbreviation(abbreviation: Abbreviation) {
    this.props.abbreviation = abbreviation
  }

  // Getter para a categoria da notificação
  public get abbreviation(): Abbreviation {
    return this.props.abbreviation
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
