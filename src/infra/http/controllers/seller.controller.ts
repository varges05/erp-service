/* eslint-disable no-useless-constructor */
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common'
import { CreateSellerBody } from '../dtos/create.seller.body'
import { SaveSeller } from '@app/use-cases/seller/save-seller'
import { SellerViewModel } from '../view-models/seller-view-model'
import { GetSeller } from '@app/use-cases/seller/get-seller'
import { UpdateSeller } from '@app/use-cases/seller/update-seller'
import { ListSeller } from '@app/use-cases/seller/list-seller'

@Controller('sellers')
export class SellerController {
  constructor(
    private saveSeller: SaveSeller,
    private getSeller: GetSeller,
    private updateSeller: UpdateSeller,
    private listSeller: ListSeller,
  ) {}

  @Get()
  async getAllSellers() {
    const sellers = await this.listSeller.getAll()
    return {
      sellers,
    }
  }

  @Patch('update/:id')
  async update(@Body() body: CreateSellerBody, @Param('id') sellerId: string) {
    const { name, active, email } = body
    const seller = await this.updateSeller.execute({
      sellerId,
      name,
      email,
      active,
    })
    return {
      seller: SellerViewModel.toHTTP(seller),
    }
  }

  @Get('from/:sellerId')
  async getFromSeller(@Param('sellerId') sellerId: string) {
    const { seller } = await this.getSeller.execute({
      sellerId,
    })
    return {
      seller: SellerViewModel.toHTTP(seller),
    }
  }

  @Post()
  async create(@Body() body: CreateSellerBody) {
    const { name, email, active } = body

    const { seller } = await this.saveSeller.execute({
      name,
      email,
      active,
    })
    return {
      seller: SellerViewModel.toHTTP(seller),
    }
  }
}
