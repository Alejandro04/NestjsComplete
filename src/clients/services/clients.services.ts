import { Injectable } from '@nestjs/common';
import { Client } from '../entities/client.entity';

@Injectable()
export class ClientService {
  private readonly clients: Client[] = [];

  findAll(): Client[] {
    return this.clients;
  }

  create(client: Client) {
    this.clients.push(client);
  }
}