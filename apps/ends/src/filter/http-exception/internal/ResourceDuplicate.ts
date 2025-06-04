import { BaseError, ErrorCode } from '.';

export class ResourceDuplicate extends BaseError {
  constructor(message?: string) {
    super(ErrorCode.ResourceDuplicate, message ?? 'Resource duplicate');
  }
}