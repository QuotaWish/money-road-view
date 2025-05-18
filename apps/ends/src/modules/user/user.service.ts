import { Injectable, Logger } from '@nestjs/common';
import { prismaClient } from 'src/lib/prisma';

@Injectable()
export class UserService {
  constructor() {
    setTimeout(async () => {
      if (await prismaClient.user.count() === 0) {
        this.initAdminUser()
      }
    })
  }

  async getAllUsers() {
    return prismaClient.user.findMany()
  }

  async initAdminUser() {
    const res = await prismaClient.user.create({
      data: {
        name: 'admin',
        email: 'admin@money-road.com',
        emailVerified: new Date(),
        image: '',
      }
    })

    Logger.log(`Admin user created: ${res.id}`)
  }
}
