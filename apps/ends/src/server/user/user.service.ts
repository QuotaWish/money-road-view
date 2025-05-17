import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {
    setTimeout(async () => {
      if (await this.prisma.user.count() === 0) {
        this.initAdminUser()
      }
    })
  }

  async getAllUsers() {
    return this.prisma.user.findMany()
  }

  async initAdminUser() {
    const res = await this.prisma.user.create({
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
