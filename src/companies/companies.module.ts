import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyService } from './services/company.services';
import { CompanyController } from './controllers/company.controller';
import { Company } from './entities/company.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Company])
  ],
  providers: [CompanyService],
  controllers: [CompanyController]
})
export class CompaniesModule {}