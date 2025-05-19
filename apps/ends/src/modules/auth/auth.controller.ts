import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorator/public.decorator';
import { UserLoginProps } from './auth.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Public()
  @Post("login")
  @ApiOperation({ summary: 'Login' })
  async login(@Body() entity: UserLoginProps) {
    return await this.authService.handleLogin(entity)
  }

  @Public()
  @Post("refresh")
  @ApiOperation({ summary: 'Refresh token' })
  async refresh(@Body() body: { token: string }) {
    return await this.authService.handleRefresh(body.token)
  }
}
