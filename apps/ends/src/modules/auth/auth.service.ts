import { Injectable } from '@nestjs/common';
import { isEmpty } from 'class-validator';
import { ResourceNotFound } from 'src/filter/http-exception/internal/ResourceNotFound';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { UserLoginProps } from './auth.dto';
import { BusinessException } from 'src/filter/http-exception/internal/BusinessException';

@Injectable()
export class AuthService {

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {

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

    const user = this.userService.getUser(account.userId)
    const token = this.signIn(account.userId)

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
      sub: user.id
    }

    return {
      access_token: await this.jwtService.signAsync(payload)
    }
  }
}
