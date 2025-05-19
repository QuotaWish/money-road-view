import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { User } from 'prisma/client';
import { ListResult, PaginationDto } from 'src/common/dto/pagination.dto';

export type IUserInfo = User

export class ListResultUser extends ListResult<User> {
  @ApiProperty({ type: Array<User> })
  data: User[];
}

export class UserPagniationDto extends PaginationDto {

  @MinLength(1)
  @MaxLength(32)
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: '账号名称参数',
  })
  name?: string;

  @IsString()
  @IsEmail()
  @IsOptional()
  @ApiProperty({
    description: '邮箱名称参数',
  })
  email?: string;
}