import { Injectable, Logger } from '@nestjs/common';
import { prismaClient } from 'src/lib/database';
import * as bcrypt from 'bcrypt'
import type { Account, User } from 'prisma/client';
import { UserPagniationDto } from './user.dto';
import { UserRegisterProsp } from '../auth/auth.dto';

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

  /**
   * Hashes a plain-text password using bcrypt.
   *
   * @param password - The plain-text password to be hashed.
   * @param saltRounds - Number of salt rounds to use for hashing (default: 10).
   * @returns The hashed password as a string.
   *
   * @example
   * ```ts
   * const hashed = await hashPassword('mySecret123');
   * console.log(hashed); // $2b$10$...
   * ```
   */
  async hashPassword(password: string, saltRounds = 10): Promise<string> {
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(password, salt);
  }


  async createUser(entity: UserRegisterProsp): Promise<User> {
    return await prismaClient.user.create({
      data: {
        name: entity.account,
        email: entity.account,
        role: 'USER',
      },
    });
  }

  async createAccount(userId: string, entity: UserRegisterProsp): Promise<Account> {
    const hashedPassword = await this.hashPassword(entity.password); // 假设你已有这个方法

    return await prismaClient.account.create({
      data: {
        userId,
        type: entity.type,
        provider: entity.type,
        providerAccountId: entity.account,
        id_token: hashedPassword,
      },
    });
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
