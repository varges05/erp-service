import { Replace } from 'src/helpers/Replace'
import { randomUUID } from 'node:crypto'

export interface ProductCategoryProps {
  productId: string
  categoryId: string
  createAt: Date
}

export class ProductCategory {
  private _id: string
  private props: ProductCategoryProps

  constructor(
    props: Replace<ProductCategoryProps, { createAt?: Date }>,
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

  public get productId() {
    return this.props.productId
  }

  public get categoryId() {
    return this.props.categoryId
  }

  public get createdAt(): Date {
    return this.props.createAt
  }
}
