import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
//import { CategoriesService } from './services/categories.service';
import { ClientsController } from './controllers/clients.controller';
import { Client } from './entities/client.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Client])
  ],
  providers: [],
  controllers: [ClientsController]
})
export class ClientsModule {}