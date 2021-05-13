import { Controller, Get, Post, Patch, Delete, Request, UseGuards, Param, Body } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ClientService } from '../services/clients.services';
import { Client } from '../entities/client.entity';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientService: ClientService) {}

  //@UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    await this.clientService.findAll();
  }

  //@UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() client: Client) {
    await this.clientService.create(client);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    //await this.usersService.findOne(+id);
  }

  //@UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: number, @Body() client: Client) {
    await this.clientService.update(id, client);
  }

  //@UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.clientService.remove(id);
  }
}