import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  BadRequestException,
  Req,
  ParseIntPipe,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Response } from "express";
import { CookiGetter } from "../decorator/cookie_getter.decorator";
import { CreateAdminDto } from "../admin/dto";
import { SignIn } from "./dto/sign-in.dto";
import { CreateUserDto } from "../user/dto";
import { CreateSellerDto } from "../seller/dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signup_admin")
  async signUp(@Body() createAdminDto: CreateAdminDto) {
    return this.authService.signUpAdmin(createAdminDto);
  }
  @Post("signin_admin")
  async signIn(
    @Body() signInDto: SignIn,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signInAdmin(signInDto, res);
  }
  @Post("signout_admin")
  async signOut(
    @CookiGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signOutAdmin(refreshToken, res);
  }
  @Post(":id/refreshadmin")
  refresh(
    @Param("id", ParseIntPipe) id: number,
    @CookiGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.refreshToken(id, refreshToken, res);
  }
  //------------------------------------------------------------------------




  @Post("signup_user")
  async signUpUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUpUser(createUserDto);
  }
  @Post("signin_user")
  async signInUser(
    @Body() signInDto: SignIn,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signInUser(signInDto, res);
  }
  @Post("signout_user")
  async signOutUser(
    @CookiGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signOutUser(refreshToken, res);
  }
  @Post(":id/refresh_user")
  refreshUser(
    @Param("id", ParseIntPipe) id: number,
    @CookiGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.refreshTokenUser(id, refreshToken, res);
  }
  //-------------------------------------------------------------------------------------------------------------------
  @Post("signup_seller")
  async signUpSeller(@Body() createSellerDto: CreateSellerDto) {
    return this.authService.signUpSeller(createSellerDto);
  }
  @Post("signin_seller")
  async signInSeller(
    @Body() signInDto: SignIn,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signInSeller(signInDto, res);
  }
  @Post("signout_seller")
  async signOutSeller(
    @CookiGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signOutSeller(refreshToken, res);
  }
  @Post(":id/refresh_seller")
  refreshSeller(
    @Param("id", ParseIntPipe) id: number,
    @CookiGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.refreshTokenSeller(id, refreshToken, res);
  }
  
}