import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientService } from './services/patients.services';
import { PatientsController } from './controllers/patients.controller';
import { Patient } from './entities/patient.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Patient])
  ],
  providers: [PatientService],
  controllers: [PatientsController]
})
export class PatientsModule {}