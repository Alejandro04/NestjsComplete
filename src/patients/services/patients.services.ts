import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from '../entities/patient.entity';
import { PatientInterface } from '../entities/patient.interface';

@Injectable()
export class PatientService {
  constructor(@InjectRepository(Patient) private patientRepo: Repository<Patient>) { }

  public async findAll() {
    try {
      return await this.patientRepo.find({ relations: ['client'] });
    } catch (error) {
      return error;
    }
  }

  public async create(patient: PatientInterface) {
    try {
      return await this.patientRepo.save(patient);
    } catch (error) {
      return error;
    }
  }

  public async update(id: number, patient: PatientInterface) {
    try {
      await this.patientRepo.update(id, patient)
      const clientUpdated = this.patientRepo.findOne(id)
      return clientUpdated;
    } catch (error) {
      return error;
    }
  }

  public async remove(id: number) {
    try {
      return await this.patientRepo.delete(id);
    } catch (error) {
      return error;
    }
  }
}