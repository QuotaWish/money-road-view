import { BaseError, ErrorCode } from '.';

export class BusinessException extends BaseError {
  constructor(message?: string) {
    super(ErrorCode.BusinessException, message ?? 'failed');
  }
}