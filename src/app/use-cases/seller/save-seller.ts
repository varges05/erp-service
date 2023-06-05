/* eslint-disable no-useless-constructor */
import { Seller } from '@app/entities/seller/seller'
import { Name } from '@app/entities/seller/name'
import { SellersRepository } from '@app/repositories/seller-repository'
import { Injectable } from '@nestjs/common'

// Interface para a requisição de envio de vendedor
interface SaveSellerRequest {
  name: string
  email: string
  active: boolean
}

// Interface para a resposta do envio de vendedor
interface SaveSellerResponse {
  seller: Seller
}

@Injectable()
export class SaveSeller {
  constructor(private sellerRepository: SellersRepository) {}

  // Método execute para enviar a vendedor
  async execute(request: SaveSellerRequest): Promise<SaveSellerResponse> {
    const { name, active, email } = request

    // Cria uma nova instância de Seller com os dados fornecidos
    const seller = new Seller({
      name: new Name(name),
      email,
      active,
    })

    // Chama o método create do sellerRepository para persistir a vendedor
    await this.sellerRepository.create(seller)

    // Retorna a vendedor como parte da resposta
    return {
      seller,
    }
  }
}
