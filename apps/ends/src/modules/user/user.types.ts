import { ApiProperty } from '@nestjs/swagger';
import { User } from 'prisma/client';
import { ListResult } from 'src/common/dto/pagination.dto';

export type IUserInfo = User

export class ListResultUser extends ListResult<User> {
  @ApiProperty({ type: Array<User> })
  data: User[];
}

export class UserDto implements User {
  name: string;
  id: string;
  email: string;
  emailVerified: Date;
  image: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}