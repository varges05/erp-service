import { IsNotEmpty, Length, Matches } from 'class-validator'

export class CreateAddressBody {
  @IsNotEmpty()
  @Length(3, 100)
  road: string

  @IsNotEmpty()
  neighborhood: string

  @IsNotEmpty()
  number: string

  @IsNotEmpty()
  customerIds: string[]

  @IsNotEmpty()
  complement: string

  @IsNotEmpty()
  @Length(8)
  @Matches(/^\d{8}$/)
  cep: string
}
