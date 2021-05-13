import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from '../entities/company.entity';

@Injectable()
export class CompanyService {
  constructor(@InjectRepository(Company) private companyRepo: Repository<Company>) {}
  
  findAll(): Promise<Company[]> {
    return this.companyRepo.find();
  }

  create(company: Company) {
    this.companyRepo.insert(company)
  }
}