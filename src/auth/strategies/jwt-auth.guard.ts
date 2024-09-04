import { Injectable, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Reflector } from "@nestjs/core";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    // Add custom logic here if necessary before JWT validation
    return super.canActivate(context); // Calls the Passport strategy's validation method
  }

  handleRequest(err, user, info, context: ExecutionContext) {
    // Custom error handling or response modification logic if needed
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
