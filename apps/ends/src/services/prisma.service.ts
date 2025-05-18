// import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
// // import { PrismaPg } from '@prisma/adapter-pg';
// import { PrismaClient } from '@prisma/client';

// const URL = process.env.END_DATABASE_URL;

// console.log(URL)

// @Injectable()
// export class PrismaService extends PrismaClient implements OnModuleInit {
//   constructor() {
//     super({
//       datasources: {
//         db: {
//           url: process.env.END_DATABASE_URL
//         }
//       }
//     })
//   }

//   async onModuleInit() {
//     await this.$connect();

//     Logger.log('PrismaService connected to database');
//   }

//   async onModuleDestroy() {
//     await this.$disconnect();
//   }
// }
