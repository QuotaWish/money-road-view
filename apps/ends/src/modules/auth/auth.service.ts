import { Injectable, Logger } from '@nestjs/common';
import { isEmpty } from 'class-validator';
import { ResourceNotFound } from 'src/filter/http-exception/internal/ResourceNotFound';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { UserLoginProps } from './auth.dto';
import { BusinessException } from 'src/filter/http-exception/internal/BusinessException';
import { IUserInfo } from '../user/user.types';
import { jwtConstants } from 'src/common/constants';
import { GaUnauthorizedException } from 'src/filter/http-exception/internal/GaUnauthorizedException';

@Injectable()
export class AuthService {

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {

  }

  async handleRefresh(token: string) {
    const payload = await this.jwtService.verifyAsync(token, {
      secret: jwtConstants.secret,
    });

    if (payload['type'] !== 'refresh')
      throw new GaUnauthorizedException("Invalid token type")

    Logger.log(`[Authorize] Refresh token for user ${payload.sub}`)

    return this.signIn(payload.sub)
  }

  async handleLogin(entity: UserLoginProps) {
    const account = await this.userService.getAccount(entity.account, entity.password, entity.type)
    if (isEmpty(account)) {
      throw new ResourceNotFound()
    }

    const isCorrect = await this.userService.comparePassword(entity.password, account.id_token)
    if (!isCorrect) {
      throw new BusinessException("Credential is incorrect")
    }

    const user = await this.userService.getUser(account.userId)
    const token = await this.signIn(account.userId)

    Logger.log(`User ${account.userId} login success`)

    return {
      user, token
    }
  }

  async signIn(userId: string) {
    const user = await this.userService.getUser(userId)
    if (isEmpty(user)) {
      throw new ResourceNotFound()
    }

    const payload = {
      user,
      type: 'access',
      sub: user.id
    }

    return {
      access_token: await this.jwtService.signAsync(payload),
      refresh_token: await this.signInRefresh(user.id)
    }
  }

  async signInRefresh(userId: string) {
    const refreshPayload = {
      type: 'refresh',
      sub: userId,
      time: Date.now()
    }

    return this.jwtService.signAsync(refreshPayload)
  }
}
