import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { Client } from '../../clients/entities/client.entity';
import { Consult } from '../../consults/entities/consult.entity';
import { Hairdressing } from '../../hairdressings/entities/hairdressing.entity';

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

  /*FK: Creo la columna primero y luego aplico la relacion*/
  @Column()
  clientId: string;

  @ManyToOne(() => Client, client => client.patients)
  client: Client;

  @ManyToMany(() => Consult)
  @JoinTable()
  consults: Consult[];

  @ManyToMany(() => Hairdressing)
  @JoinTable()
  hairdressings: Hairdressing[];
}