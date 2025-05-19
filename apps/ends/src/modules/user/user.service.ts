import { Injectable, Logger } from '@nestjs/common';
import { prismaClient } from 'src/lib/database';
import * as bcrypt from 'bcrypt'
import type { User } from 'prisma/client';
import { UserPagniationDto } from './user.types';

@Injectable()
export class UserService {
  constructor(
  ) {
    setTimeout(async () => {
      if (await prismaClient.user.count() === 0) {
        this.initAdminUser()
      }
    })
  }

  async getUser(userId: string) {
    return prismaClient.user.findUnique({
      where: {
        id: userId
      }
    })
  }

  async getAccount(account: string, credential: string, type: string) {
    return prismaClient.account.findFirst({
      where: {
        providerAccountId: account,
        type,
        scope: 'global'
      }
    })
  }

  async getAllUsers(entity: UserPagniationDto) {
    const { skip, take } = entity.toSkipAndTake()

    const whereQuery: any = {

    }

    if (entity.name) {
      whereQuery.name = {
        contains: entity.name
      }
    }

    if (entity.email) {
      whereQuery.email = {
        contains: entity.email
      }
    }

    const total = await prismaClient.user.count()
    const result = (await prismaClient.user.findMany({
      skip,
      take,
      where: {
        ...whereQuery
      }
    })) as unknown as User[]

    return entity.buildResponse<User>(result, total)
  }

  comparePassword(password: string, hash: string) {
    return bcrypt.compare(password, hash)
  }

  async initAdminAccount(adminUser: string) {
    const DEFAULT_PASSWORD = '123456789'

    const hash = await this.hashCredential(DEFAULT_PASSWORD)

    const res = await prismaClient.account.create({
      data: {
        userId: adminUser,
        type: 'password',
        scope: 'global',
        token_type: 'jwt',
        id_token: hash,
        provider: 'internal',
        providerAccountId: 'admin'
      }
    })

    Logger.log(`Admin account created: ${JSON.stringify(res)}`)
  }

  async initAdminUser() {
    const res = await prismaClient.user.create({
      data: {
        name: 'admin',
        email: 'admin@money-road.com',
        emailVerified: new Date(),
        image: '',
        role: 'ADMIN',
      }
    })

    this.initAdminAccount(res.id)

    Logger.log(`Admin user created: ${res.id}`)
  }

  hashCredential(password: string) {
    return bcrypt.hash(password, 10)
  }
}
