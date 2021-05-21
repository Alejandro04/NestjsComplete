import { Controller, Get, Post, Patch, Delete, Request, UseGuards, Param, Body } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ClientService } from '../services/clients.services';
import { Client } from '../entities/client.entity';
import { ClientInterface } from '../entities/client.interface';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientService: ClientService) {}

  //@UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<Client[]> {
    return await this.clientService.findAll();
  }

  //@UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() client: Client) {
    console.log("client es", client)
    return await this.clientService.create(client);
  }
  
  //@UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: number, @Body() client: Client) {
    return await this.clientService.update(id, client);
  }

  //@UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.clientService.remove(id);
  }
}