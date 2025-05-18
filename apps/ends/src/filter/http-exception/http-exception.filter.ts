import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { BaseError } from './internal';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();
    const status = exception.getStatus();
    const exceptionResponse: any = exception.getResponse();

    let validMessage = '';

    if (typeof exceptionResponse === 'object') {
      validMessage =
        exceptionResponse['error'] ?? (
          typeof exceptionResponse.message === 'string'
            ? exceptionResponse.message
            : exceptionResponse.message[0]);
    }
    const message = exception.message
      ? exception.message
      : `${status >= 500 ? 'Service Error' : 'Client Error'}`;

    const errorResponse = {
      data: null,
      message: validMessage || message,
      code: status ?? -1,
    };

    if (exception.getResponse() instanceof BaseError) {
      const ex = (exception.getResponse() as BaseError)
      errorResponse.code = ex.code as unknown as number;
      errorResponse.message = ex.message
    }

    response.status(200);
    response.header('Content-Type', 'application/json; charset=utf-8');
    response.send(errorResponse);

    Logger.log(`[Exception] Request from ${request.hostname} for (${request.method})${request.url} occurred an error: ${JSON.stringify(errorResponse)} - ${JSON.stringify(exception)}`)
  }
}
