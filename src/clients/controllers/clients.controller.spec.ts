import { INestApplication } from '@nestjs/common';
import { ClientsController } from './clients.controller';
import { ClientService } from '../services/clients.services';
import { ClientsModule } from '../clients.module';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';

describe('Clients', () => {
    let app: INestApplication;
    let clientService = { findAll: () => ['test'] };
  
    beforeAll(async () => {
      const moduleRef = await Test.createTestingModule({
        imports: [ClientsModule],
      })
        .overrideProvider(ClientService)
        .useValue(clientService)
        .compile();
  
      app = moduleRef.createNestApplication();
      await app.init();
    });
  
    it(`/GET clients`, () => {
      return request(app.getHttpServer())
        .get('/clients')
        .expect(200)
        .expect({
          data: clientService.findAll(),
        });
    });
  
    afterAll(async () => {
      await app.close();
    });
  });