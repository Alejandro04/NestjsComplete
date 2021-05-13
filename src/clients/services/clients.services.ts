import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from '../entities/client.entity';

@Injectable()
export class ClientService {
  constructor(@InjectRepository(Client) private clientRepo: Repository<Client>) { }

  public async findAll() {
    try {
      return await this.clientRepo.find();
    } catch (error) {
      return error;
    }
  }

  public async create(client: Client) {
    try {
      return await this.clientRepo.save(client);
    } catch (error) {
      return error;
    }
  }

  public async update(id: number, client: Client) {
    try {
      await this.clientRepo.update(id, client)
      const clientUpdated = this.clientRepo.findOne(id)
      return clientUpdated;
    } catch (error) {
      return error;
    }
  }

  public async remove(id: number) {
    try {
      return await this.clientRepo.delete(id);
    } catch (error) {
      return error;
    }
  }
}