import { Controller, Post, Body, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorator/public.decorator';
import { UserLoginProps } from './auth.dto';
import { IpAddress } from 'src/common/decorator/ip-address.decorator';
import { UserInfo } from 'src/common/decorator/user-info.decorator';
import type { User } from '@prisma/client';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Public()
  @Post("login")
  @ApiOperation({ summary: 'Login' })
  async login(@Body() entity: UserLoginProps, @Headers('user-agent') userAgent: string, @IpAddress() ip: string) {
    return await this.authService.handleLogin(entity, userAgent, ip)
  }

  @Public()
  @Post("register")
  @ApiOperation({ summary: 'Register' })
  async register(@Body() entity: UserLoginProps, @Headers('user-agent') userAgent: string, @IpAddress() ip: string) {
    return await this.authService.handleLogin(entity, userAgent, ip)
  }

  @Public()
  @Post("refresh")
  @ApiOperation({ summary: 'Refresh token' })
  async refresh(@Body() body: { token: string }) {
    return await this.authService.handleRefresh(body.token)
  }

  @Post("history")
  @ApiOperation({ summary: 'Get user history (latest 10)' })
  async getHistory(@UserInfo() entity: User) {
    return await this.authService.getHistory(entity)
  }
}
