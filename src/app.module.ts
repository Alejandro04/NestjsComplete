import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompaniesModule } from './companies/companies.module';
import { ConsultsModule } from './consults/consults.module';
import { ClientsModule } from './clients/clients.module';
import { HairdressingsModule } from './hairdressings/hairdressings.module';
import { PatientsModule } from './patients/patients.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'database-1.cthrokqgzera.us-east-1.rds.amazonaws.com',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'database-1',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: false
    }),
    AuthModule,
    UserModule,
    CompaniesModule,
    ConsultsModule,
    ClientsModule,
    HairdressingsModule,
    PatientsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
