import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { JwtAuthGuard } from "../guards/admin/jwt-auth.guard";
import { JwtCreatorGuard } from "../guards/admin/jwt-creator.guard";
import { JwtSelfGuard } from "../guards/admin/jst-self.guard";
import { UserGuard } from "../guards/user/user.guard";
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard, JwtCreatorGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }
  @UseGuards( UserGuard)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.userService.findOne(+id);
  }

  @UseGuards(UserGuard)
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }
  @UseGuards(JwtAuthGuard, JwtCreatorGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.userService.remove(+id);
  }
}
