import { BaseError, ErrorCode } from '.';

export class ResourceNotFound extends BaseError {
  constructor(message?: string) {
    super(ErrorCode.ResourceNotFound, message ?? 'Resource not found');
  }
}