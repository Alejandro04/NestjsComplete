import { PatientInterface } from '../entities/patient.interface';
import { PatientsController } from '../controllers/patients.controller';
import { PatientService } from '../services/patients.services';
import { Test } from '@nestjs/testing';
import MockDataPatients from './mockdatapatients.json';

class ApiServiceMock {

  create(patient: PatientInterface) {
    return {
      clientId: patient.clientId,
      name: patient.name,
      breed: patient.breed,
      weight: patient.weight,
      age: patient.age,
      sex: patient.sex,
      species: patient.species
    }
  }

  findAll() {
    return MockDataPatients
  }
}

describe('PatientsController', () => {
  let controller: PatientsController;
  let service: PatientService;

  beforeEach(async () => {
    const ApiServiceProvider = {
      provide: PatientService,
      useClass: ApiServiceMock,
    };
    const moduleRef = await Test.createTestingModule({
      controllers: [PatientsController],
      providers: [PatientService, ApiServiceProvider],
    }).compile();

    controller = moduleRef.get<PatientsController>(PatientsController);
    service = moduleRef.get<PatientService>(PatientService);
  });

  it('PatientService - should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should get array of patients', async () => {
      const expectedPatients = MockDataPatients
      const patients = await service.findAll()
      expect(patients).toEqual(expectedPatients);
    });
  });

  describe('create', () => {
    it('should create a patient', async () => {
      const expectedPatient = {
        clientId: 1,
        name: 'Chester',
        breed: 'Pouder',
        weight: '7 Kg',
        age: '6 años',
        sex: 'M',
        species: 'Canino'
      }
      const patient = await service.create(expectedPatient)
      expect(patient).toEqual(expectedPatient);
    });
  });

  it('Should be defined controller', () => {
    expect(controller).toBeDefined();
  });

  describe('Call patients service', () => {
    it('should call get patients service', async () => {
      controller.findAll()
      expect(service.findAll())
    });
    it('should call create patient service', async () => {
      const expectedPatient = {
        clientId: 1,
        name: 'Chester',
        breed: 'Pouder',
        weight: '7 Kg',
        age: '6 años',
        sex: 'M',
        species: 'Canino'
      }
      controller.create(expectedPatient)
      expect(service.create(expectedPatient))
    });
  });
});

