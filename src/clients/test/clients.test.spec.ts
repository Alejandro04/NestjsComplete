import { ClientInterface } from '../entities/client.interface';
import { ClientsController } from '../controllers/clients.controller';
import { ClientService } from '../services/clients.services';
import { Test } from '@nestjs/testing';
import MockDataClients from './mockdataclients.json';

class ApiServiceMock {

  create(client: ClientInterface) {
    return {
      first_name: client.first_name,
      last_name: client.last_name,
      dni: client.dni
    }
  }

  findAll() {
    return MockDataClients
  }
}

describe('ClientsController', () => {
  let controller: ClientsController;
  let service: ClientService;

  beforeEach(async () => {
    const ApiServiceProvider = {
      provide: ClientService,
      useClass: ApiServiceMock,
    };
    const moduleRef = await Test.createTestingModule({
      controllers: [ClientsController],
      providers: [ClientService, ApiServiceProvider],
    }).compile();

      controller = moduleRef.get<ClientsController>(ClientsController);
      service = moduleRef.get<ClientService>(ClientService);
  });

  it('ClientService - should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should get array of clients', async () => {
      const expectedClients = MockDataClients
      const clients = await service.findAll()
      expect(clients).toEqual(expectedClients);
    });
  });

  describe('create', () => {
    it('should create a client', async () => {
      const expectedClient = {
        first_name: 'Alejandro',
        last_name: 'Roa',
        dni: '12121212'
      }
      const client = await service.create(expectedClient)
      expect(client).toEqual(expectedClient);
    });
  });

  it('Should be defined controller', () => {
    expect(controller).toBeDefined();
  });

  describe('Call clients service', () => {
    it('should call get clients service', async () => {
      controller.findAll()
      expect(service.findAll())
    });
    it('should call create client service', async () => {
      const expectedClient = {
        first_name: 'Alejandro',
        last_name: 'Roa',
        dni: '12121212'
      }
      controller.create(expectedClient)
      expect(service.create(expectedClient))
    });
  });

  /*
  Analizar cómo puede ser este test
  describe('update', () => {
    it('should update a client', async () => {
      const id = 1
      const expectedClient = {
        first_name: 'Alejandro',
        last_name: 'Roa',
        dni: '12121212'
      } 
      controller.update(id, expectedClient)
      expect(service.update(id, expectedClient))
    });
  });
  */

});

