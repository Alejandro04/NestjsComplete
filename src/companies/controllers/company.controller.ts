import { Controller, Get, Post, Patch, Delete, Request, UseGuards, Param, Body } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CompanyService } from '../services/company.services';
import { Company } from '../entities/company.entity';
import { CompanyInterface } from '../entities/company.interface';

@Controller('companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  //@UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return await this.companyService.findAll();
  }

  //@UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() company: CompanyInterface) {
    return await this.companyService.create(company);
  }
  
  //@UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: number, @Body() company: Company) {
    return await this.companyService.update(id, company);
  }

  //@UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.companyService.remove(id);
  }
}