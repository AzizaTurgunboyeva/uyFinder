import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserPreferenceService } from './user-preference.service';
import { CreateUserPreferenceDto } from './dto/create-user-preference.dto';
import { UpdateUserPreferenceDto } from './dto/update-user-preference.dto';

@Controller('user-preference')
export class UserPreferenceController {
  constructor(private readonly userPreferenceService: UserPreferenceService) {}

  @Post()
  create(@Body() createUserPreferenceDto: CreateUserPreferenceDto) {
    return this.userPreferenceService.create(createUserPreferenceDto);
  }

  @Get()
  findAll() {
    return this.userPreferenceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userPreferenceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserPreferenceDto: UpdateUserPreferenceDto) {
    return this.userPreferenceService.update(+id, updateUserPreferenceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userPreferenceService.remove(+id);
  }
}
