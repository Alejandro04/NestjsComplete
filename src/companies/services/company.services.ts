import { CompanyInterface } from './../entities/company.interface';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './../entities/company.entity';

@Injectable()
export class CompanyService {
  constructor(@InjectRepository(Company) private companyRepo: Repository<Company>) { }

  public async findAll() {
    try {
      return await this.companyRepo.find({ relations: ['users'] });
    } catch (error) {
      return error;
    }
  }

  public async create(company: CompanyInterface) {
    try {
      return await this.companyRepo.save(company);
    } catch (error) {
      return error;
    }
  }

  public async update(id: number, company: CompanyInterface) {
    try {
      await this.companyRepo.update(id, company)
      const companyUpdated = this.companyRepo.findOne(id)
      return companyUpdated;
    } catch (error) {
      return error;
    }
  }

  public async remove(id: number) {
    try {
      return await this.companyRepo.delete(id);
    } catch (error) {
      return error;
    }
  }
}