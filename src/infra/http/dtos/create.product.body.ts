import { Decimal } from '@prisma/client/runtime'
import { IsBoolean, IsNotEmpty, Length, ArrayNotEmpty } from 'class-validator'

export class CreateProductBody {
  @IsNotEmpty()
  @Length(3, 20)
  name: string

  @IsNotEmpty()
  code: string

  @ArrayNotEmpty()
  categoryIds: string[]

  @IsNotEmpty()
  price: Decimal | number

  @IsNotEmpty()
  @IsBoolean()
  active: boolean
}
