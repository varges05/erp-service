import { Replace } from 'src/helpers/Replace'
import { randomUUID } from 'node:crypto'

export interface CustomerAddressProps {
  customerId: string
  addressId: string
  createAt: Date
}

export class AddressCustomer {
  private _id: string
  private props: CustomerAddressProps

  constructor(
    props: Replace<CustomerAddressProps, { createAt?: Date }>,
    id?: string,
  ) {
    this._id = id ?? randomUUID()

    this.props = {
      ...props,
      createAt: props.createAt ?? new Date(),
    }
  }

  public get id() {
    return this._id
  }

  public get customerId() {
    return this.props.customerId
  }

  public get addressId() {
    return this.props.addressId
  }

  public get createdAt(): Date {
    return this.props.createAt
  }
}
