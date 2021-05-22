import { CompanyInterface } from '../entities/company.interface';
import { CompanyController } from '../controllers/company.controller';
import { CompanyService } from '../services/company.services';
import { Test } from '@nestjs/testing';
import MockDataCompanies from './mockdatacompanies.json';

class ApiServiceMock {

  create(company: CompanyInterface) {
    return {
      name: company.name
    }
  }

  findAll() {
    return MockDataCompanies
  }
}

describe('CompaniesCrud', () => {
  let controller: CompanyController;
  let service: CompanyService;

  beforeEach(async () => {
    const ApiServiceProvider = {
      provide: CompanyService,
      useClass: ApiServiceMock,
    };
    const moduleRef = await Test.createTestingModule({
      controllers: [CompanyController],
      providers: [CompanyService, ApiServiceProvider],
    }).compile();

    controller = moduleRef.get<CompanyController>(CompanyController);
    service = moduleRef.get<CompanyService>(CompanyService);
  });

  it('CompanyService - should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should get array of companies', async () => {
      const expectedCompanies = MockDataCompanies
      const companies = await service.findAll()
      expect(companies).toEqual(expectedCompanies);
    });
  });

  describe('create', () => {
    it('should create a company', async () => {
      const expectedCompany = {
        name: 'Company 1'
      }
      const company = await service.create(expectedCompany)
      expect(company).toEqual(expectedCompany);
    });
  });

  it('Should be defined controller', () => {
    expect(controller).toBeDefined();
  });

  describe('Call companies service', () => {
    it('should call get companies service', async () => {
      controller.findAll()
      expect(service.findAll())
    });
    it('should call create company service', async () => {
      const expectedCompany = {
        name: 'Company 1'
      }
      controller.create(expectedCompany)
      expect(service.create(expectedCompany))
    });
  });

});

