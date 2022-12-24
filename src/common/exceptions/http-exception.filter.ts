import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const stack = exception.stack;
    const excResponse = exception.getResponse();

    response.status(status).json({
      response: excResponse.valueOf(),
      timestamp: new Date().toISOString(),
      path: request.url,
      stack,
    });
  }
}
