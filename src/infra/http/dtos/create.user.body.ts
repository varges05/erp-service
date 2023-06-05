import {
  IsBoolean,
  IsNotEmpty,
  Length,
  IsEmail,
  Matches,
} from 'class-validator'

export class CreateUserBody {
  @IsNotEmpty()
  @Length(3, 20)
  name: string

  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @Length(6, 60)
  @Matches(/^(?=.*[a-zA-Z])(?=.*[0-9])/)
  password: string

  @IsNotEmpty()
  @IsBoolean()
  active: boolean
}
