import { Replace } from 'src/helpers/Replace'
import { Content } from './content'
import { randomUUID } from 'node:crypto'

export interface NotificationProps {
  recipientId: string
  content: Content
  category: string
  readAt?: Date | null
  canceledAt?: Date | null
  createAt: Date
}

export class Notification {
  private _id: string
  private props: NotificationProps

  // Construtor da classe Notification
  constructor(
    props: Replace<NotificationProps, { createAt?: Date }>,
    id?: string,
  ) {
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

  // Setter para o ID do destinatário
  public set recipientId(recipientId: string) {
    this.props.recipientId = recipientId
  }

  // Getter para o ID do destinatário
  public get recipientId(): string {
    return this.props.recipientId
  }

  // Setter para o conteúdo da notificação
  public set content(content: Content) {
    this.props.content = content
  }

  // Getter para o conteúdo da notificação
  public get content(): Content {
    return this.props.content
  }

  // Setter para a categoria da notificação
  public set category(category: string) {
    this.props.category = category
  }

  // Getter para a categoria da notificação
  public get category(): string {
    return this.props.category
  }

  // Marca a notificação como lida, definindo a data de leitura como a data atual
  public read() {
    this.props.readAt = new Date()
  }

  // Marca a notificação como não lida, definindo a data de leitura como null
  public unread() {
    this.props.readAt = null
  }

  // Getter para a data de leitura da notificação
  public get readAt(): Date | null | undefined {
    return this.props.readAt
  }

  // Cancela a notificação, definindo a data de cancelamento como a data atual
  public cancel() {
    this.props.canceledAt = new Date()
  }

  // Getter para a data de cancelamento da notificação
  public get canceledAt(): Date | null | undefined {
    return this.props.canceledAt
  }

  // Getter para a data de criação da notificação
  public get createdAt(): Date {
    return this.props.createAt
  }
}
