import { Controller, Get, Post, Patch, Delete, Request, UseGuards, Param, Body } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { HairdressingServices } from '../services/hairdressing.services';
import { Hairdressing } from '../entities/hairdressing.entity';

@Controller('hairdressings')
export class HairdressingController {
  constructor(private readonly hairdressingService: HairdressingServices) {}

  //@UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return await this.hairdressingService.findAll();
  }

  //@UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() hairdressing: Hairdressing ) {
    return await this.hairdressingService.create(hairdressing);
  }
  
  //@UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: number, @Body() hairdressing: Hairdressing) {
    return await this.hairdressingService.update(id, hairdressing);
  }

  //@UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.hairdressingService.remove(id);
  }
}