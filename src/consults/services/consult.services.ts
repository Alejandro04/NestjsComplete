import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Consult } from './../entities/consult.entity';
import { ConsultInterface } from '../entities/consult.interface';

@Injectable()
export class ConsultServices {
  constructor(@InjectRepository(Consult) private consultRepo: Repository<Consult>) { }

  public async findAll() {
    try {
      return await this.consultRepo.find({ relations: ['patients'] });
    } catch (error) {
      return error;
    }
  }

  public async create(consult: ConsultInterface) {
    try {
      return await this.consultRepo.save(consult);
    } catch (error) {
      return error;
    }
  }

  public async update(id: number, consult: ConsultInterface) {
    try {
      await this.consultRepo.update(id, consult)
      const consultUpdated = this.consultRepo.findOne(id)
      return consultUpdated;
    } catch (error) {
      return error;
    }
  }

  public async remove(id: number) {
    try {
      return await this.consultRepo.delete(id);
    } catch (error) {
      return error;
    }
  }
}