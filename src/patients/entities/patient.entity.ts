import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Client } from '../../clients/entities/client.entity';

@Entity()
export class Patient {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  breed: string;

  @Column()
  weight: string;

  @Column()
  age: string;
  
  @Column()
  sex: string;

  @Column()
  species: string;

  @ManyToOne(() => Client, client => client.patients)
  client: Client;
}