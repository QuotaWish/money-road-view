import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/public.decorator';
import { UserRegisterProps } from './user.dto';
import { isEmpty } from 'class-validator';
import { ResourceNotFound } from 'src/filter/http-exception/internal/ResourceNotFound';
import { BusinessException } from 'src/filter/http-exception/internal/BusinessException';


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

  @Public()
  @Post("login")
  @ApiOperation({ summary: 'Login' })
  async login(@Body() entity: UserRegisterProps) {
    const account = await this.userService.getAccount(entity.account, entity.password, entity.type)
    if (isEmpty(account)) {
      throw new ResourceNotFound()
    }

    const isCorrect = await this.userService.comparePassword(entity.password, account.id_token)
    if (!isCorrect) {
      throw new BusinessException("Credential is incorrect")
    }

    const user = this.userService.getUser(account.userId)

    return user
  }
}
