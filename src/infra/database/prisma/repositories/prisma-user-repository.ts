/* eslint-disable no-useless-constructor */
import { Injectable } from '@nestjs/common'
import { UsersRepository } from '@app/repositories/user-repository'
import { PrismaService } from '../prisma.service'
import { PrismaUserMapper } from '../mappers/prisma-user-mapper'
import { User } from '@app/entities/user/user'
import { UserNotFound } from '@app/use-cases/errors/user-not-found'

@Injectable()
export class PrismaUserRepository implements UsersRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    const rawUsers = await this.prisma.user.findMany()
    return rawUsers.map(PrismaUserMapper.toDomain)
  }

  async update(user: User): Promise<User> {
    const { id, name, active, email } = user

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        name: name.value,
        email,
        active,
      },
    })

    if (!updatedUser) {
      throw new UserNotFound()
    }

    return PrismaUserMapper.toDomain(updatedUser)
  }

  async findById(userId: string): Promise<User | null> {
    const rawUser = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    })

    if (!rawUser) {
      return null
    }

    return PrismaUserMapper.toDomain(rawUser)
  }

  async create(user: User): Promise<void> {
    const raw = PrismaUserMapper.toPrisma(user)
    await this.prisma.user.create({
      data: raw,
    })
  }

  async save(user: User): Promise<void> {
    const raw = PrismaUserMapper.toPrisma(user)

    await this.prisma.user.update({
      where: {
        id: raw.id,
      },
      data: raw,
    })
  }
}
