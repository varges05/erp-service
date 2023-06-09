import { IsBoolean, IsNotEmpty, Length } from 'class-validator'

export class CreateCategoryBody {
  @IsNotEmpty()
  @Length(3, 20)
  name: string

  @IsNotEmpty()
  @Length(2, 4)
  abbreviation: string

  @IsNotEmpty()
  @IsBoolean()
  active: boolean
}
