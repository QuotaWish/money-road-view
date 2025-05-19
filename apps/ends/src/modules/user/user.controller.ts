import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiExtraModels, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorator/public.decorator';
import { ListResultUser, IUserInfo, UserDto } from './user.types';
import { UserInfo } from 'src/common/decorator/user-info.decorator';
import { AdminOnly } from 'src/common/decorator/admin.decorator';
import { ListResult, PaginationDto } from 'src/common/dto/pagination.dto';
import { ApiPaginatedResponse } from 'src/common/decorator/api-paginated-response.decorator';

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

  @Get("users")
  @AdminOnly()
  @ApiOperation({ summary: 'Get users list ' })
  @ApiResponse({ type: ListResultUser, isArray: true })
  getUsers(@Body() entity: PaginationDto) {
    return this.userService.getAllUsers(new PaginationDto(entity));
  }

  @Public()
  @Post("register")
  @ApiOperation({ summary: 'Register' })
  register() {

  }


}
