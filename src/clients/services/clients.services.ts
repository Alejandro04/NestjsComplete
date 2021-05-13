import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from '../entities/client.entity';

@Injectable()
export class ClientService {
  constructor(@InjectRepository(Client) public clientRepo: Repository<Client>) {}
  private readonly clients: Client[] = [];

  public async findAll() {
    return this.clientRepo.find();
  }

  public async create(client: Client) {
    return await this.clientRepo.save(client);
  }

  update(id:number, client:Client){
    this.clientRepo.update(id, client);
  }

  remove(id: number){
    this.clientRepo.delete(id);
  }
}