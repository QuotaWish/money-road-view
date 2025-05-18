import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/public.decorator';
import { UserLoginProps } from './auth.dto';

@ApiTags('认证')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Public()
  @Post("login")
  @ApiOperation({ summary: 'Login' })
  async login(@Body() entity: UserLoginProps) {
    return await this.authService.handleLogin(entity)
  }
}
