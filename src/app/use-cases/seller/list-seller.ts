/* eslint-disable no-useless-constructor */
import { SellersRepository } from '@app/repositories/seller-repository'
import { SellerViewModel } from '@helpers/infra/http/view-models/seller-view-model'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ListSeller {
  constructor(private sellerRepository: SellersRepository) {}

  async getAll() {
    const sellers = await this.sellerRepository.findAll()
    return sellers.map((seller) => SellerViewModel.toHTTP(seller))
  }
}
