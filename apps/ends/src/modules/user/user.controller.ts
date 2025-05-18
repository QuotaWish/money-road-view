import { Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorator/public.decorator';
import type { IUserInfo } from './user.types';
import { UserInfo } from 'src/common/decorator/user-info.decorator';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get("info")
  @ApiOperation({ summary: 'Get logined user info' })
  async getUserInfo(@UserInfo() userInfo: IUserInfo) {
    return userInfo
  }

  @Get("users")
  getUsers() {
    return this.userService.getAllUsers();
  }

  @Public()
  @Post("register")
  @ApiOperation({ summary: 'Register' })
  register() {

  }


}
