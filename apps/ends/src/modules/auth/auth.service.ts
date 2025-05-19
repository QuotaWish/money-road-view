import { Injectable, Logger } from '@nestjs/common';
import { isEmpty } from 'class-validator';
import { ResourceNotFound } from 'src/filter/http-exception/internal/ResourceNotFound';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { UserLoginProps } from './auth.dto';
import { BusinessException } from 'src/filter/http-exception/internal/BusinessException';
import { jwtConstants } from 'src/common/constants';
import { GaUnauthorizedException } from 'src/filter/http-exception/internal/GaUnauthorizedException';
import { prismaClient } from 'src/lib/database';
import type { Account, User } from '@prisma/client';

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

    const account = await prismaClient.account.findFirst({
      where: {
        provider: payload.provider,
        providerAccountId: payload.providerAccountId
      }
    })
    if (isEmpty(account)) {
      throw new GaUnauthorizedException("Invalid token with account")
    }

    if (account.refresh_token !== token) {
      throw new GaUnauthorizedException("Invalid token")
    }

    const user = await this.userService.getUser(payload.sub)

    Logger.log(`[Authorize] Refresh token for user ${payload.sub}`)

    return this.handleAuth(user, account)
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
    const token = await this.handleAuth(user, account)

    Logger.log(`User ${account.userId} login success`)

    return {
      user, token
    }
  }

  async handleAuth(user: User, account: Account) {
    const token = await this.signIn(account.userId, account)

    await prismaClient.account.update({
      where: {
        userId: user.id,
        type: account.type,
        provider_providerAccountId: {
          provider: account.provider,
          providerAccountId: account.providerAccountId
        }
      },
      data: {
        ...account,
        refresh_token: token.refresh_token,
        access_token: token.access_token,
        expires_at: token.expire_time / 1000,
      }
    })

    Logger.log(`User ${account.userId} Authenticated with account ${account.provider} ${account.providerAccountId}`)

    return token
  }

  async signIn(userId: string, account: Account) {
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
      expire_time: 60000, // TODO sync with jwt constants
      access_token: await this.jwtService.signAsync(payload),
      refresh_token: await this.signInRefresh(user.id, account)
    }
  }

  async signInRefresh(userId: string, account: Account) {
    const refreshPayload = {
      type: 'refresh',
      account: {
        scope: account.scope,
        provider: account.provider,
        providerAccountId: account.providerAccountId
      },
      sub: userId,
      time: Date.now()
    }

    return this.jwtService.signAsync(refreshPayload, {
      expiresIn: '7d',
    })
  }
}
