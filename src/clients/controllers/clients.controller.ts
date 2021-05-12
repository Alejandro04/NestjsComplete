import { Controller, Get, Post, Patch, Delete, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller('clients')
export class ClientsController {

  @UseGuards(JwtAuthGuard)
  @Get()
  getClients(@Request() req) {
    return "ok";
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  postClients(@Request() req) {
    return "Ok";
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  putClients(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  deleteClients(@Request() req) {
    return req.user;
  }
}