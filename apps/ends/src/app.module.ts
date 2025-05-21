import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { jwtAuthGuard } from './guard/jwt-auth.guard';
import { ConfigModule } from '@nestjs/config';
import { ConfigModule as ConfigurationModule } from './modules/config/config.module';

@Module({
  imports: [ConfigModule.forRoot(), UserModule, AuthModule, ConfigurationModule],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: jwtAuthGuard,
  }],
})
export class AppModule { }
