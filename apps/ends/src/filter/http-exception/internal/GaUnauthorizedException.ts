import { UnauthorizedException } from '@nestjs/common';
import { ErrorCode } from '.';

export class GaUnauthorizedException extends UnauthorizedException {
  constructor(message?: string) {
    super(ErrorCode.UnauthorizedException, message ?? 'unauthorized');
  }
}