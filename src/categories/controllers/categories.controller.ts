import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../auth/enums/role.enums';

@Controller('categories')
export class CategoriesController {

  @Get()
  @Roles(Role.Admin)
  getProfile(@Request() req) {
    return req.user;
  }
}
