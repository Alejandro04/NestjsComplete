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
  const mockClientService = {}

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
        controllers: [ClientsController],
        providers: [ClientService],
      })
      .overrideProvider(ClientService)
      .useValue(mockClientService)
      .compile();
      
    controller = moduleRef.get<ClientsController>(ClientsController);
  });

  /*
  describe('findAll', () => {
    it('should return an array of cats', async () => {
      const result = ['test'];
      jest.spyOn(clientService, 'findAll').mockImplementation(() => result);

      expect(await clientsController.findAll()).toBe(result);
    });
  });
  */

  it('Should be defined', () => {
    expect(controller).toBeDefined();
  });
});

