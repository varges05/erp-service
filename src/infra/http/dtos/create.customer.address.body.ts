import { IsNotEmpty } from 'class-validator'

export class CreateCustomerAddressBody {
  @IsNotEmpty()
  customerId: string

  @IsNotEmpty()
  addressId: string
}
