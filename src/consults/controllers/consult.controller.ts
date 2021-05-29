import { Controller, Get, Post, Patch, Delete, Request, UseGuards, Param, Body } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ConsultServices } from '../services/consult.services';
import { Consult } from '../entities/consult.entity';
import { ConsultInterface } from '../entities/consult.interface';

@Controller('consults')
export class ConsultController {
  constructor(private readonly consultService: ConsultServices) {}

  //@UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return await this.consultService.findAll();
  }

  //@UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() consult: ConsultInterface) {
    return await this.consultService.create(consult);
  }
  
  //@UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: number, @Body() consult: ConsultInterface) {
    return await this.consultService.update(id, consult);
  }

  //@UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.consultService.remove(id);
  }
}