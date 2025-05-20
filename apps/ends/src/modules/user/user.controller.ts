import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorator/public.decorator';
import { IUserInfo, UserPagniationDto } from './user.dto';
import { UserInfo } from 'src/common/decorator/user-info.decorator';
import { AdminOnly } from 'src/common/decorator/admin.decorator';
import { ListResult, PaginationDto } from 'src/common/dto/pagination.dto';
import { ApiResult } from 'src/common/decorator/api-result.decorator';
import { User } from 'prisma/prisma-class/user';

@ApiTags('User')
@Controller('user')
@ApiExtraModels(ListResult)
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get("info")
  @ApiOperation({ summary: 'Get logined user info' })
  async getUserInfo(@UserInfo() userInfo: IUserInfo) {
    return userInfo
  }

  @Post("users")
  @AdminOnly()
  @ApiOperation({ summary: 'Get users list ' })
  @ApiResult(User, true)
  getUsers(@Body() entity: UserPagniationDto) {
    return this.userService.getAllUsers(new PaginationDto(entity));
  }

  @Public()
  @Post("register")
  @ApiOperation({ summary: 'Register' })
  register() {

  }

}
