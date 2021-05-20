import { INestApplication } from '@nestjs/common';
import { ClientsController } from './clients.controller';
import { ClientService } from '../services/clients.services';
import { ClientsModule } from '../clients.module';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { Repository } from 'typeorm';
import { Client } from '../entities/client.entity';

describe('ClientsController', () => {
  let clientsController: ClientsController;
  let clientService: ClientService;

  beforeEach(() => {
    let clientRepo: Repository<Client>
    clientService = new ClientService(clientRepo);
    clientsController = new ClientsController(clientService);
  });

  describe('findAll', () => {
    it('should return an array of clients', async () => {
      const result = [{}];
      jest.spyOn(clientService, 'findAll').mockImplementation(() => result);

      expect(await clientsController.findAll()).toBe(result);
    });
  });
});