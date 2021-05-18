import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Hairdressing } from './../entities/hairdressing.entity';

@Injectable()
export class HairdressingServices {
  constructor(@InjectRepository(Hairdressing) private hairdressingRepo: Repository<Hairdressing>) { }

  public async findAll() {
    try {
      return await this.hairdressingRepo.find({ relations: ['patients'] });
    } catch (error) {
      return error;
    }
  }

  public async create(hairdressing: Hairdressing) {
    try {
      return await this.hairdressingRepo.save(hairdressing);
    } catch (error) {
      return error;
    }
  }

  public async update(id: number, hairdressing: Hairdressing) {
    try {
      await this.hairdressingRepo.update(id, hairdressing)
      const hairdressingUpdated = this.hairdressingRepo.findOne(id)
      return hairdressingUpdated;
    } catch (error) {
      return error;
    }
  }

  public async remove(id: number) {
    try {
      return await this.hairdressingRepo.delete(id);
    } catch (error) {
      return error;
    }
  }
}