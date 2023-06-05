/* eslint-disable no-useless-constructor */
import { SellersRepository } from '@app/repositories/seller-repository'
import { Injectable } from '@nestjs/common'
import { Name } from '@app/entities/seller/name'
import { Seller } from '@app/entities/seller/seller'
import { SellerNotFound } from '../errors/seller-not-found'

export interface UpdateSellerRequest {
  sellerId: string
  name: string
  email: string
  active: boolean
  updatedAt?: Date
}

@Injectable()
export class UpdateSeller {
  constructor(private sellerRepository: SellersRepository) {}

  async execute(request: UpdateSellerRequest): Promise<Seller> {
    const { sellerId, name, active, email } = request

    // Verificar se a categoria existe no repositório
    const existingSeller = await this.sellerRepository.findById(sellerId)
    if (!existingSeller) {
      throw new SellerNotFound()
    }

    // Atualizar os dados da categoria existente
    existingSeller.name = new Name(name)
    existingSeller.active = active
    existingSeller.email = email
    existingSeller.updated()

    // Chamar o método update do sellerRepository para salvar as alterações
    const updatedSeller = await this.sellerRepository.update(existingSeller)
    if (!updatedSeller) {
      throw new SellerNotFound()
    }

    return updatedSeller
  }
}
