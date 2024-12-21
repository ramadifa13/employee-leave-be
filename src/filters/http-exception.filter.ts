import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    const status = exception.status || 500;
    const message = exception.message || 'Internal server error';
    response.status(status).json({
      statusCode: status,
      message: message,
    });
  }
}
