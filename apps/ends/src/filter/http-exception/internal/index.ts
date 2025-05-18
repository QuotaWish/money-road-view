import { HttpException } from '@nestjs/common';

export enum ErrorCode {
  ResourceNotFound = '11404',
  BusinessException = '11101'
}

export class BaseError extends HttpException {
  code: ErrorCode

  constructor(code: ErrorCode, message: string) {
    super(message, 200);
    this.name = this.constructor.name;
    this.code = code;
    this.message = message;

    Error.captureStackTrace(this, this.constructor);
  }
}
