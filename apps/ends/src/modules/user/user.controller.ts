import { Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/public.decorator';

@ApiTags('用户')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }
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
