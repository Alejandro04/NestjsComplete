import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from '../entities/client.entity';

@Injectable()
export class ClientService {
  constructor(@InjectRepository(Client) public clientRepo: Repository<Client>) {}
  
  findAll(): Promise<Client[]> {
    return this.clientRepo.find();
  }

  create(client: Client) {
    this.clientRepo.insert(client)
  }

  update(id:number, client:Client){
    this.clientRepo.update(id, client);
  }

  remove(id: number){
    this.clientRepo.delete(id);
  }
}