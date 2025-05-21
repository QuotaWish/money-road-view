import { Controller, Post, Body, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorator/public.decorator';
import { UserLoginProps } from './auth.dto';
import { IpAddress } from 'src/common/decorator/ip-address.decorator';

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
  @Post("refresh")
  @ApiOperation({ summary: 'Refresh token' })
  async refresh(@Body() body: { token: string }) {
    return await this.authService.handleRefresh(body.token)
  }
}
