import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { ValidationError } from "class-validator";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    let message = (exception as any)?.message || "Internal server error";

    // Check if the exception is a Validation Error
    if (exception instanceof HttpException) {
      const responseBody = exception.getResponse();
      if (Array.isArray((responseBody as any)?.message)) {
        // Handling validation errors
        status = HttpStatus.BAD_REQUEST;
        message = this.handleValidationErrors((responseBody as any).message);
      }
    }
    let exceptionRaw = "";
    try {
      exceptionRaw = JSON.stringify(exception);
    } catch (e) {}

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
      raw: exceptionRaw,
    });
  }

  private handleValidationErrors(messages: any[]): any {
    if (messages && messages.length > 0) {
      const errors = messages as ValidationError[];
      console.log(`errors: `, JSON.stringify(errors));
      return errors.join("; ");
    }
    return "Validation failed";
  }
}
