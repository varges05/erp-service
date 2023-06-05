import { IsBoolean, IsNotEmpty, Length, IsEmail } from 'class-validator'

export class CreateSellerBody {
  @IsNotEmpty()
  @Length(3, 20)
  name: string

  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsBoolean()
  active: boolean
}
