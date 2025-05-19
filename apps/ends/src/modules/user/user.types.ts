import { ApiProperty } from '@nestjs/swagger';
import { User } from 'prisma/client';
import { ListResult } from 'src/common/dto/pagination.dto';

export type IUserInfo = User

export class ListResultUser extends ListResult<User> {
  @ApiProperty({ type: Array<User> })
  data: User[];
}
