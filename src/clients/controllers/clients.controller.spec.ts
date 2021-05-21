import { ClientInterface } from './../entities/client.interface';
import { INestApplication } from '@nestjs/common';
import { ClientsController } from './clients.controller';
import { ClientService } from '../services/clients.services';
import { ClientsModule } from '../clients.module';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { Repository } from 'typeorm';
import { Client } from '../entities/client.entity';

class ApiServiceMock {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findAll() {
    return [
      {
        "id": 1,
        "first_name": "asasasasa",
        "last_name": "roa",
        "dni": "121212",
        "phone1": null,
        "phone2": null,
        "companyId": 1,
        "company": {
          "id": 1,
          "name": "Company 2",
          "country": null,
          "phone1": null,
          "phone2": null,
          "email": null,
          "plan": null,
          "facebook_url": null,
          "twitter_url": null,
          "instagram_url": null
        }
      },
      {
        "id": 2,
        "first_name": "asasasasa",
        "last_name": "roa",
        "dni": "121212",
        "phone1": null,
        "phone2": null,
        "companyId": 1,
        "company": {
          "id": 1,
          "name": "Company 2",
          "country": null,
          "phone1": null,
          "phone2": null,
          "email": null,
          "plan": null,
          "facebook_url": null,
          "twitter_url": null,
          "instagram_url": null
        }
      },
      {
        "id": 3,
        "first_name": "asasasasa",
        "last_name": "roa",
        "dni": "121212",
        "phone1": null,
        "phone2": null,
        "companyId": 1,
        "company": {
          "id": 1,
          "name": "Company 2",
          "country": null,
          "phone1": null,
          "phone2": null,
          "email": null,
          "plan": null,
          "facebook_url": null,
          "twitter_url": null,
          "instagram_url": null
        }
      },
      {
        "id": 4,
        "first_name": "asasasasa",
        "last_name": "roa",
        "dni": "121212",
        "phone1": null,
        "phone2": null,
        "companyId": 1,
        "company": {
          "id": 1,
          "name": "Company 2",
          "country": null,
          "phone1": null,
          "phone2": null,
          "email": null,
          "plan": null,
          "facebook_url": null,
          "twitter_url": null,
          "instagram_url": null
        }
      }
    ]
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
      const expectedClients = [
        {
          "id": 1,
          "first_name": "asasasasa",
          "last_name": "roa",
          "dni": "121212",
          "phone1": null,
          "phone2": null,
          "companyId": 1,
          "company": {
            "id": 1,
            "name": "Company 2",
            "country": null,
            "phone1": null,
            "phone2": null,
            "email": null,
            "plan": null,
            "facebook_url": null,
            "twitter_url": null,
            "instagram_url": null
          }
        },
        {
          "id": 2,
          "first_name": "asasasasa",
          "last_name": "roa",
          "dni": "121212",
          "phone1": null,
          "phone2": null,
          "companyId": 1,
          "company": {
            "id": 1,
            "name": "Company 2",
            "country": null,
            "phone1": null,
            "phone2": null,
            "email": null,
            "plan": null,
            "facebook_url": null,
            "twitter_url": null,
            "instagram_url": null
          }
        },
        {
          "id": 3,
          "first_name": "asasasasa",
          "last_name": "roa",
          "dni": "121212",
          "phone1": null,
          "phone2": null,
          "companyId": 1,
          "company": {
            "id": 1,
            "name": "Company 2",
            "country": null,
            "phone1": null,
            "phone2": null,
            "email": null,
            "plan": null,
            "facebook_url": null,
            "twitter_url": null,
            "instagram_url": null
          }
        },
        {
          "id": 4,
          "first_name": "asasasasa",
          "last_name": "roa",
          "dni": "121212",
          "phone1": null,
          "phone2": null,
          "companyId": 1,
          "company": {
            "id": 1,
            "name": "Company 2",
            "country": null,
            "phone1": null,
            "phone2": null,
            "email": null,
            "plan": null,
            "facebook_url": null,
            "twitter_url": null,
            "instagram_url": null
          }
        }
      ]
      const clients = await service.findAll()
      expect(clients).toEqual(expectedClients);
    });
  });


  /*
  it('Should be defined', () => {
    expect(controller).toBeDefined();
  });
    */


  // ENTONCES AL PARECER LA FORMA EN COMO ESCRIBI LAS FUNCIONALIDADES INJECTANDO LA ENTIDAD
  // COMO TYPE NO PERMITE TESTEAR BIEN
});

