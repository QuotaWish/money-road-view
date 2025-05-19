import { ExecutionContext, Injectable, CanActivate } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../common/decorator/public.decorator';
import { JwtService } from '@nestjs/jwt';
import { GaUnauthorizedException } from 'src/filter/http-exception/internal/GaUnauthorizedException';
import { jwtConstants } from 'src/common/constants';
import type { IUserInfo } from 'src/modules/user/user.types';

@Injectable()
export class jwtAuthGuard implements CanActivate {
  constructor(protected jwtService: JwtService, protected reflector: Reflector) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      // 💡 See this condition
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new GaUnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });

      if (payload['type'] !== 'access') {
        throw new GaUnauthorizedException('Invalid token type')
      }

      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['user'] = payload.user as IUserInfo;
    } catch {
      throw new GaUnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
