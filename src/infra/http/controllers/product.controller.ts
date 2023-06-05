/* eslint-disable no-useless-constructor */
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common'
import { CreateProductBody } from '../dtos/create.product.body'
import { SaveProduct } from '@app/use-cases/product/save-product'
import { ProductViewModel } from '../view-models/product-view-model'
import { GetProduct } from '@app/use-cases/product/get-product'
import { UpdateProduct } from '@app/use-cases/product/update-product'
import { ListProduct } from '@app/use-cases/product/list-product'
import { ProductCategoryViewModel } from '../view-models/product-category-view-model'
import { CategoryViewModel } from '../view-models/category-view-model'

@Controller('products')
export class ProductController {
  constructor(
    private saveProduct: SaveProduct,
    private getProduct: GetProduct,
    private updateProduct: UpdateProduct,
    private listProduct: ListProduct,
  ) {}

  @Get()
  async getAllCategories() {
    const categories = await this.listProduct.getAll()
    return {
      categories,
    }
  }

  @Patch('update/:id')
  async update(
    @Body() body: CreateProductBody,
    @Param('id') productId: string,
  ) {
    const { price, name, code, active, categoryIds } = body
    const { product, categories } = await this.updateProduct.execute({
      productId,
      name,
      price,
      code,
      active,
      categoryIds,
    })
    return {
      product: ProductViewModel.toHTTP(product),
      productCategories: categories.map(ProductCategoryViewModel.toHTTP),
    }
  }

  @Get('from/:productId')
  async getFromProduct(@Param('productId') productId: string) {
    const { product, categories } = await this.getProduct.execute({ productId })
    const productWithCategories = {
      product: ProductViewModel.toHTTP(product),
      categories: categories.map((category) =>
        CategoryViewModel.toHTTP(category),
      ),
    }
    return productWithCategories
  }

  @Post()
  async create(@Body() body: CreateProductBody) {
    const { name, price, code, active, categoryIds } = body

    const { product, categories } = await this.saveProduct.executeProduct({
      name,
      price,
      code,
      active,
      categoryIds,
    })

    return {
      product: ProductViewModel.toHTTP(product),
      productCategories: categories.map(ProductCategoryViewModel.toHTTP),
    }
  }
}
