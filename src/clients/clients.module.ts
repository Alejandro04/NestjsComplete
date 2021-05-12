import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientService } from './services/clients.services';
import { ClientsController } from './controllers/clients.controller';
import { Client } from './entities/client.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Client])
  ],
  providers: [ClientService],
  controllers: [ClientsController]
})
export class ClientsModule {}