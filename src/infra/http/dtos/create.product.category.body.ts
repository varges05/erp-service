import { IsNotEmpty } from 'class-validator'

export class CreateProductCategoryBody {
  @IsNotEmpty()
  productId: string

  @IsNotEmpty()
  categoryId: string
}
