import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async validateToken(token: string) {
    let payload: any;
    try {
      payload = await this.jwtService.verify(token, {
        secret: process.env.ACCESS_TOKEN_KEY,
      });
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException("Invalid or expired token");
    }

    if (!payload) {
      throw new UnauthorizedException("Unauthorized user");
    }

    if (!payload.is_active || !payload.userType) {
      throw new ForbiddenException("Not allowed");
    }

    return payload;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException("Unauthorized user");
    }

    const [bearer, token] = authHeader.split(" ");

    if (bearer !== "Bearer" || !token) {
      throw new UnauthorizedException("Invalid Bearer token");
    }

    const user = await this.validateToken(token);
    req.user = user;

    return true;
  }
}
