import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsultServices } from './services/consult.services';
import { ConsultController } from './controllers/consult.controller';
import { Consult } from './entities/consult.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Consult])
  ],
  providers: [ConsultServices],
  controllers: [ConsultController]
})
export class ConsultsModule {}