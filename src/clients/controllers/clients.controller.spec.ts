import { ClientInterface } from './../entities/client.interface';
import { INestApplication } from '@nestjs/common';
import { ClientsController } from './clients.controller';
import { ClientService } from '../services/clients.services';
import { ClientsModule } from '../clients.module';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { Repository } from 'typeorm';
import { Client } from '../entities/client.entity';


describe('ClientsController', () => {
  let controller: ClientsController;
  let service: ClientService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [ClientsController],
      providers: [ClientService],
    }).compile();

      controller = moduleRef.get<ClientsController>(ClientsController);
      service = moduleRef.get<ClientService>(ClientService);
  });

  it('ClientService - should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getGpa', () => {
    it('should get student GPA', async () => {
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
      const clients = await controller.findAll()
      expect(clients).toEqual(expectedClients);
    });
  });

  describe('findAll', () => {
    it('should return clients', async () => {
      controller.findAll()
      expect(service.findAll()).toHaveBeenCalled();
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

