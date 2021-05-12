import { Controller, Get, Post, Patch, Delete, Request, UseGuards, Param, Body } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ClientService } from '../services/clients.services';
import { Client } from '../entities/client.entity';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientService: ClientService) {}

  //@UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.clientService.findAll();
  }

  //@UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() client: Client) {
    return this.clientService.create(client);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    //return this.usersService.findOne(+id);
  }

  //@UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() client: Client) {
    return this.clientService.update(id, client);
  }

  //@UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.clientService.remove(id);
  }
}