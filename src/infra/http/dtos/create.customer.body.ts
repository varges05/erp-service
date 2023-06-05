import {
  IsBoolean,
  IsNotEmpty,
  Length,
  IsEmail,
  Matches,
} from 'class-validator'

export class CreateCustomerBody {
  @IsNotEmpty()
  @Length(3, 20)
  name: string

  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @Length(11)
  @Matches(/^\d{11}$/)
  phone: string

  @IsNotEmpty()
  @IsBoolean()
  active: boolean
}
