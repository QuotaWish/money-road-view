import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/common/constants';
import JwtAuthStrategy from '../user/jwt-auth.strategy';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtAuthStrategy],
  exports: [AuthService]
})
export class AuthModule { }
