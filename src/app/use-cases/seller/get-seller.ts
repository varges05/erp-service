/* eslint-disable no-useless-constructor */
import { SellersRepository } from '@app/repositories/seller-repository'
import { Injectable } from '@nestjs/common'
import { SellerNotFound } from '../errors/seller-not-found'
import { Seller } from '@app/entities/seller/seller'

interface GetSellerRequest {
  sellerId: string
}

interface GetSellerResponse {
  seller: Seller
}

@Injectable()
export class GetSeller {
  constructor(private sellerRepository: SellersRepository) {}

  async execute(request: GetSellerRequest): Promise<GetSellerResponse> {
    const { sellerId } = request

    const seller = await this.sellerRepository.findById(sellerId)

    if (!seller) {
      throw new SellerNotFound()
    }
    return {
      seller,
    }
  }
}
