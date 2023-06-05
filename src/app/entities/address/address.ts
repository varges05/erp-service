import { Replace } from 'src/helpers/Replace'
import { Road } from './road'
import { randomUUID } from 'node:crypto'
import { Cep } from './cep'

export interface AddressProps {
  road: Road
  neighborhood: string
  number: string
  cep: Cep
  complement: string
  updatedAt?: Date | null
  createAt: Date
}

export class Address {
  private _id: string
  private props: AddressProps

  // Construtor da classe Address
  constructor(props: Replace<AddressProps, { createAt?: Date }>, id?: string) {
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
  public set road(road: Road) {
    this.props.road = road
  }

  // Getter para o conteúdo da notificação
  public get road(): Road {
    return this.props.road
  }

  // Setter para o conteúdo da notificação
  public set neighborhood(neighborhood: string) {
    this.props.neighborhood = neighborhood
  }

  // Getter para o conteúdo da notificação
  public get neighborhood(): string {
    return this.props.neighborhood
  }

  // Setter para o conteúdo da notificação
  public set number(number: string) {
    this.props.number = number
  }

  // Getter para o conteúdo da notificação
  public get number(): string {
    return this.props.number
  }

  // Setter para o conteúdo da notificação
  public set cep(cep: Cep) {
    this.props.cep = cep
  }

  // Getter para o conteúdo da notificação
  public get cep(): Cep {
    return this.props.cep
  }

  // Setter para o conteúdo do complemento
  public set complement(complement: string) {
    this.props.complement = complement
  }

  // Getter para o conteúdo do complemento
  public get complement(): string {
    return this.props.complement
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
