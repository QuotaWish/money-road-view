// src/common/decorators/user-info.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { IUserInfo } from 'src/modules/user/user.dto';

export const UserInfo = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): IUserInfo => {
    const request = ctx.switchToHttp().getRequest();

    return request.user;
  },
);
