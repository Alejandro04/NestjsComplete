import { Controller, Get, Post, Patch, Delete, Request, UseGuards, Param, Body } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { PatientService } from '../services/patients.services';
import { Patient } from '../entities/patient.entity';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientService: PatientService) {}

  //@UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return await this.patientService.findAll();
  }

  //@UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() patient: Patient) {
    return await this.patientService.create(patient);
  }
  
  //@UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: number, @Body() patient: Patient) {
    return await this.patientService.update(id, patient);
  }

  //@UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.patientService.remove(id);
  }
}