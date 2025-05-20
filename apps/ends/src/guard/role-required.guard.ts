import { ExecutionContext, Injectable, CanActivate, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../common/decorator/public.decorator';
import { JwtService } from '@nestjs/jwt';
import { GaUnauthorizedException } from 'src/filter/http-exception/internal/GaUnauthorizedException';
import { jwtConstants } from 'src/common/constants';
import type { IUserInfo } from 'src/modules/user/user.dto';
import { jwtAuthGuard } from './jwt-auth.guard';

@Injectable()
export class RoleRequiredGuard extends jwtAuthGuard {
  constructor(protected jwtService: JwtService, protected reflector: Reflector) {
    super(jwtService, reflector)
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    super.canActivate(context);

    const role = this.reflector.getAllAndOverride<string>('role', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!role) {
      return true
    }

    const request = context.switchToHttp().getRequest();
    const user: IUserInfo = request['user'];

    if (!user) {
      throw new GaUnauthorizedException()
    }

    if (user.role?.toUpperCase() !== role.toUpperCase()) {
      Logger.warn(`Role ${user.role} is not allowed to access ${role}`)
      throw new GaUnauthorizedException('No permission')
    }

    return true;
  }
}
