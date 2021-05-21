### 1. Notas Unit Test con Mock
Sirve para definir entradas y salidas de llamadas en el momento de crear la prueba y la funcionalidad
No sirven para mantener un control en el tiempo de las llamadas


### 0. Docu Relations CRUD
https://wanago.io/2020/06/22/api-nestjs-relationships-postgres-typeorm/


### 1. Create project
```bash
npm i -g @nestjs/cli
nest new tasks-api
npm run start:dev
```
### 2. Overview and delete files
### 3. Create module
```bash
nest g mo tasks
nest g s tasks/services/tasks
nest g s tasks/services/tasks --flat
nest g co tasks/controllers/tasks --flat
```
### 4. Check endpoint and create CRUD
```ts
import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';

@Controller('api/tasks')
export class TasksControllerController {

  @Get()
  findAll() {
    return [1,2,3];
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return id;
  }

  @Post()
  create(@Body() body: any) {
    return body;
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body: any) {
    return body;
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return true;
  }

}
```
### 5. Intall DB (Docker)
```yml
version: '3.3'

services:
  postgres:
    image: postgres:13
    environment:
      - POSTGRES_DB=my_db
      - POSTGRES_USER=nico
      - POSTGRES_PASSWORD=postgres
    ports:
      - '5432:5432'
    volumes:
      - ./postgres_data:/var/lib/postgresql
```
https://dev.to/andrewallison/docker-and-windows-1cb0

### 6. Add .gitignore /postgres_data
```bash
docker-compose up -d postgres
docker-compose exec postgres bash
psql -h localhost -d my_db -U nico
\d+
\q
```
### 7. Intall TypeOrm
```bash
npm install --save @nestjs/typeorm typeorm pg
```
### 8. App Module
```ts
TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'nico',
  password: 'postgres',
  database: 'my_db',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: false,
  retryDelay: 3000,
  retryAttempts: 10
}),
```
### 9. Task Entity
```ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: false })
  completed: boolean;
}
```
### 10. Tasks Module
```ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Task } from './entities/task.entity';
import { TasksService } from './services/tasks.service';
import { TasksController } from './controllers/tasks.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task])
  ],
  providers: [TasksService],
  controllers: [TasksController]
})
export class TasksModule {}
```
### 11 Service
```ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './../entities/task.entity';

@Injectable()
export class TasksService {

  constructor(
    @InjectRepository(Task) private tasksRepo: Repository<Task>,
  ) {}

  findAll() {
    return this.tasksRepo.find();
  }

  findOne(id: number) {
    return this.tasksRepo.findOne(id);
  }

  create(body: any) {
    const newTask = new Task();
    newTask.name = body.name;
    // const newTask = this.tasksRepo.create(body);
    return this.tasksRepo.save(newTask);
  }

  async update(id: number, body: any) {
    const task = await this.tasksRepo.findOne(id);
    this.tasksRepo.merge(task, body);
    return this.tasksRepo.save(task);
  }

  async remove(id: number) {
    await this.tasksRepo.delete(id);
    return true;
  }
}
```
### 12 Controller
```ts
import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';

import { TasksService } from './../services/tasks.service';

@Controller('api/tasks')
export class TasksController {

  constructor(
    private tasksService: TasksService
  ) {}

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.tasksService.findOne(id);
  }

  @Post()
  create(@Body() body: any) {
    return this.tasksService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body: any) {
    return this.tasksService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.tasksService.remove(id);
  }

}
```
### 13 Migrations
```json
{
  "type": "postgres",
  "host": "localhost",
  "port": 5432,
  "username": "nico",
  "password": "postgres",
  "database": "my_db",
  "entities": ["src/**/*.entity.ts"],
  "synchronize": false,
  "migrationsTableName": "migrations",
  "migrations": ["src/database/migrations/*.ts"],
  "cli": {
    "migrationsDir": "src/database/migrations"
  }
}
```
### 14 Create mpm scripts
```json
"typeorm": "ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js",
"migrations:generate": "npm run typeorm -- migration:generate -n",
"migrations:run": "npm run typeorm -- migration:run",
"migrations:drop": "npm run typeorm -- schema:drop",
"migrations:show": "npm run typeorm -- migration:show"
```
```bash
npm run migrations:generate -- init
npm run migrations:run
```
### 15. Set entity
```ts
@CreateDateColumn({
  name: 'creation_at',
  type: 'timestamptz',
  default: () => 'CURRENT_TIMESTAMP',
})
creationAt: Date;

@UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
updatedAt: Date;
```
```bash
npm run migrations:generate -- change-tasks
npm run migrations:run
```