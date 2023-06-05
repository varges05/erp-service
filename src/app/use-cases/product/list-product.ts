/* eslint-disable no-useless-constructor */
import { ProductsRepository } from '@app/repositories/product-repository'
import { ProductViewModel } from '@helpers/infra/http/view-models/product-view-model'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ListProduct {
  constructor(private productRepository: ProductsRepository) {}

  async getAll() {
    const categories = await this.productRepository.findAll()
    return categories.map((product) => ProductViewModel.toHTTP(product))
  }
}
