import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HairdressingServices } from './services/hairdressing.services';
import { HairdressingController } from './controllers/hairdressing.controller';
import { Hairdressing } from './entities/hairdressing.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Hairdressing])
  ],
  providers: [HairdressingServices],
  controllers: [HairdressingController]
})
export class HairdressingsModule {}