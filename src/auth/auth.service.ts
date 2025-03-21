import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  Post,
  UnauthorizedException,
} from "@nestjs/common";

import { JwtService } from "@nestjs/jwt";
import { Admin, Seller, User } from "@prisma/client";

import * as bcrypt from "bcryptjs";
import { Response } from "express";
import { AdminsService } from "../admin/admin.service";
import { CreateAdminDto } from "../admin/dto";
import { SignIn } from "./dto/sign-in.dto";
import { CreateUserDto } from "../user/dto";
import { UserService } from "../user/user.service";
import { SellerService } from "../seller/seller.service";
import { CreateSellerDto } from "../seller/dto";
import { MailService } from "../mail/mail.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly adminService: AdminsService,
    private readonly sellerService: SellerService,
    private readonly mailService: MailService,

    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async getTokenAdmin(admin: Admin) {
    const payload = {
      id: admin.id,
      email: admin.email,
      is_creator: admin.is_creator,
      is_active: admin.is_active,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async signInAdmin(signInDto: SignIn, res: Response) {
    try {
      // Identifikatsiya
      const admin = await this.adminService.findadminByEmail(signInDto.email);
      if (!admin) {
        throw new UnauthorizedException("Foydalanuvchi topilmadi");
      }

      // Autentifikatsiya
      const tokens = await this.getTokenAdmin(admin);

      const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);

      const updateUser = await this.adminService.updateRefreshToken(
        admin.id,
        hashed_refresh_token
      );

      if (!updateUser) {
        throw new InternalServerErrorException("tokenni saqlashda xatolik");
      }

      res.cookie("refresh_token", tokens.refresh_token, {
        maxAge: Number(process.env.COOKIE_TIME),
        httpOnly: true,
      });

      return {
        message: "admin logged in",
        userId: admin.id,
        access_token: tokens.access_token,
      };
    } catch (error) {
      console.log("SignInError", error);
    }
  }
  async signUpAdmin(createAdminDto: CreateAdminDto) {
    try {
      const candidate = await this.adminService.findadminByEmail(
        createAdminDto.email
      );

      if (candidate) {
        throw new BadRequestException("Bunday foydalanuvchi mavjud");
      }
      const newAdmin = await this.adminService.create(createAdminDto);

      const tokens = await this.getTokenAdmin(newAdmin!);

      const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
      const response = { ...createAdminDto, hashToken: hashed_refresh_token };
      return response;
    } catch (error) {
      console.log("SignUp error", error);
    }
  }

  async signOutAdmin(refreshToken: string, res: Response) {
    try {
      const userData = await this.jwtService.verify(refreshToken, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });
      if (!userData) {
        throw new ForbiddenException("Admin not verified");
      }
      const hashed_refresh_token = null;
      await this.adminService.updateRefreshToken(
        userData.id,
        hashed_refresh_token
      );
      res.clearCookie("refresh_token");
      const response = {
        message: "Admin logged out successfully",
      };
      return response;
    } catch (error) {
      console.log("SigOutError", error);
    }
  }

  async refreshToken(adminId: number, refreshToken: string, res: Response) {
    try {
      const decodedToken = await this.jwtService.decode(refreshToken);
      if (adminId !== decodedToken["id"]) {
        throw new BadRequestException("Not allowed");
      }
      const admin = await this.adminService.findOne(adminId);
      if (!admin || !admin.hashToken) {
        throw new BadRequestException("Admin not found");
      }

      const tokenMatch = await bcrypt.compare(refreshToken, admin.hashToken);
      if (!tokenMatch) {
        throw new ForbiddenException("Forbidden");
      }

      const tokens = await this.getTokenAdmin(admin);

      const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
      await this.adminService.updateRefreshToken(
        admin.id,
        hashed_refresh_token
      );

      res.cookie("refresh_token", tokens.refresh_token, {
        maxAge: Number(process.env.COOKIE_TIME),
        httpOnly: true,
      });

      const response = {
        message: "Admin refreshed",
        admin: admin.id,
        access_token: tokens.access_token,
      };
      return response;
    } catch (error) {
      console.log("refreshToken", error);
    }
  }

  //--------------------------------------------------------------------------------------------------------------
  async getTokenUser(user: User) {
    const payload = {
      id: user.id,
      email: user.email,
      userType: user.userType,
      is_active: user.is_active,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
  async signUpUser(createUserDto: CreateUserDto) {
    try {
      const candidate = await this.userService.findByUser(createUserDto.email);

      if (candidate) {
        throw new BadRequestException("Bunday foydalanuvchi mavjud");
      }
      const newUser = await this.userService.create({
        ...createUserDto,
        is_active: true,
      });
      if (newUser) {
        const tokens = await this.getTokenUser(newUser);

        const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
        const response = {
          message: "Tabriklayman tizimga qo'shildingiz.",
          hashToken: hashed_refresh_token,
        };

        return response;
      } else {
        throw new Error("Foydalanuvchi yaratishda xatolik");
      }
    } catch (error) {
      console.log("SignUp error", error);
    }
  }
  async signInUser(signInDto: SignIn, res: Response) {
    try {
      // Identifikatsiya
      const user = await this.userService.findByUser(signInDto.email);
      if (!user) {
        throw new UnauthorizedException("Foydalanuvchi topilmadi");
      }

      // Autentifikatsiya
      const tokens = await this.getTokenUser(user);

      const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);

      const updateUser = await this.userService.updateRefreshToken(
        user.id,
        hashed_refresh_token
      );

      if (!updateUser) {
        throw new InternalServerErrorException("Tokenni saqlashda xatolik");
      }

      res.cookie("refresh_token", tokens.refresh_token, {
        maxAge: Number(process.env.COOKIE_TIME),
        httpOnly: true,
      });

      return {
        message: "User logged in",
        userId: user.id,
        access_token: tokens.access_token,
      };
    } catch (error) {
      console.log("SignInError", error);
    }
  }
  async signOutUser(refreshToken: string, res: Response) {
    try {
      const userData = await this.jwtService.verify(refreshToken, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });
      if (!userData) {
        throw new ForbiddenException("User not verified");
      }
      const hashed_refresh_token = null;
      await this.userService.updateRefreshToken(
        userData.id,
        hashed_refresh_token
      );
      res.clearCookie("refresh_token");
      const response = {
        message: "Usser logged out successfully",
      };
      return response;
    } catch (error) {
      console.log("SigOutError", error);
    }
  }

  async refreshTokenUser(userId: number, refreshToken: string, res: Response) {
    try {
      const decodedToken = await this.jwtService.decode(refreshToken);
      if (userId !== decodedToken["id"]) {
        throw new BadRequestException("Not allowed");
      }
      const user = await this.userService.findOne(userId);
      if (!user || !user.hashToken) {
        throw new BadRequestException("User not found");
      }

      const tokenMatch = await bcrypt.compare(refreshToken, user.hashToken);
      if (!tokenMatch) {
        throw new ForbiddenException("Forbidden");
      }

      const tokens = await this.getTokenUser(user);

      const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
      await this.userService.updateRefreshToken(user.id, hashed_refresh_token);

      res.cookie("refresh_token", tokens.refresh_token, {
        maxAge: Number(process.env.COOKIE_TIME),
        httpOnly: true,
      });

      const response = {
        message: "User refreshed",
        admin: user.id,
        access_token: tokens.access_token,
      };
      return response;
    } catch (error) {
      console.log("refreshToken", error);
    }
  }

  //-----------------------------------------------------------------------------------------------------------------------
  async getTokenSeller(seller: Seller) {
    const payload = {
      id: seller.id,
      email: seller.email,
      userType: seller.is_active,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
  async signUpSeller(createSellerDto: CreateSellerDto) {
    try {
      const candidate = await this.sellerService.findSellerByEmail(
        createSellerDto.email
      );

      if (candidate) {
        throw new BadRequestException("Bunday foydalanuvchi mavjud");
      }
      const newUser = await this.sellerService.create(createSellerDto);
      if (newUser) {
        const tokens = await this.getTokenSeller(newUser);

        const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
        try {
          await this.mailService.sendMail(newUser);
        } catch (error) {
          console.log(error);
          throw new InternalServerErrorException("Xat yuborishda xatolik");
        }
        const response = {
          message: "Tabriklayman tizimga qo'shildingiz.",
          refresh_token: hashed_refresh_token,
        };

        return response;
      } else {
        throw new Error("Foydalanuvchi yaratishda xatolik");
      }
    } catch (error) {
      console.log("SignUp error", error);
    }
  }
  async signInSeller(signInDto: SignIn, res: Response) {
    try {
      // Identifikatsiya
      const seller = await this.sellerService.findSellerByEmail(
        signInDto.email
      );
      if (!seller) {
        throw new UnauthorizedException("Foydalanuvchi topilmadi");
      }

      // Autentifikatsiya
      const tokens = await this.getTokenSeller(seller);

      const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);

      const updateUser = await this.sellerService.updateRefreshTokenSeller(
        seller.id,
        hashed_refresh_token
      );

      if (!updateUser) {
        throw new InternalServerErrorException("Tokenni saqlashda xatolik");
      }

      res.cookie("refresh_token", tokens.refresh_token, {
        maxAge: Number(process.env.COOKIE_TIME),
        httpOnly: true,
      });

      return {
        message: "Seller logged in",
        userId: seller.id,
        access_token: tokens.access_token,
      };
    } catch (error) {
      console.log("SignInError", error);
    }
  }
  async signOutSeller(refreshToken: string, res: Response) {
    try {
      const userData = await this.jwtService.verify(refreshToken, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });
      if (!userData) {
        throw new ForbiddenException("Seller not verified");
      }
      const hashed_refresh_token = null;
      await this.sellerService.updateRefreshTokenSeller(
        userData.id,
        hashed_refresh_token
      );
      res.clearCookie("refresh_token");
      const response = {
        message: "Seller logged out successfully",
      };
      return response;
    } catch (error) {
      console.log("SigOutError", error);
    }
  }
  async refreshTokenSeller(
    sellerId: number,
    refreshToken: string,
    res: Response
  ) {
    try {
      const decodedToken = await this.jwtService.decode(refreshToken);
      if (sellerId !== decodedToken["id"]) {
        throw new BadRequestException("Not allowed");
      }
      const seller = await this.sellerService.findOne(sellerId);
      if (!seller || !seller.hashToken) {
        throw new BadRequestException("Seller not found");
      }

      const tokenMatch = await bcrypt.compare(refreshToken, seller.hashToken);
      if (!tokenMatch) {
        throw new ForbiddenException("Forbidden");
      }

      const tokens = await this.getTokenSeller(seller);

      const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
      await this.userService.updateRefreshToken(
        seller.id,
        hashed_refresh_token
      );

      res.cookie("refresh_token", tokens.refresh_token, {
        maxAge: Number(process.env.COOKIE_TIME),
        httpOnly: true,
      });

      const response = {
        message: "Seller refreshed",
        seller: seller.id,
        access_token: tokens.access_token,
      };
      return response;
    } catch (error) {
      console.log("refreshToken", error);
    }
  }
}
