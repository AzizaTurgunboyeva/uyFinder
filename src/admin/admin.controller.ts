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
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { AdminsService } from "./admin.service";
import { JwtAuthGuard } from "../guards/admin/jwt-auth.guard";
import { JwtCreatorGuard } from "../guards/admin/jwt-creator.guard";
import { JwtSelfGuard } from "../guards/admin/jst-self.guard";

@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminsService) {}
  @UseGuards(JwtAuthGuard, JwtCreatorGuard)
  @Get()
  findAll() {
    return this.adminService.findAll();
  }
  @UseGuards(JwtSelfGuard, JwtAuthGuard)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.adminService.findOne(+id);
  }
  @UseGuards(JwtSelfGuard, JwtAuthGuard)
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }
  @UseGuards(JwtAuthGuard, JwtCreatorGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.adminService.remove(+id);
  }
}
