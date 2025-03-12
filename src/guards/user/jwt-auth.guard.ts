import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class JwtUserGuard implements CanActivate {
  constructor(private readonly jwtservice: JwtService) {}
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {

    const req = context.switchToHttp().getRequest();
    // console.log(req);
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException({
        message: "There isn't token on header",
      });
    }
    const bearer = authHeader.split(" ")[0];//ochib qoy
    const token = authHeader.split(" ")[1];

    if (bearer !== "Bearer" || !token) {
      throw new UnauthorizedException({ message: "Invalid Bearer token" });
    }
    let user: any;
    try {
      user = this.jwtservice.verify(token);
    } catch (error) {
      console.log(error);

      throw new UnauthorizedException({ message: "Token verficaton failed" });
    }
    //logic
    req.user=user//eng muhim joyi
    return true;
  }
}
