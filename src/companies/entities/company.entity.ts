import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { User } from '../../user/models/user.entity';
import { Client } from '../../clients/entities/client.entity';

@Entity()
export class Company {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    nullable: true,
  })
  country: string;

  @Column({
    nullable: true,
  })
  phone1: string;

  @Column({
    nullable: true,
  })
  phone2: string;

  @Column({
    nullable: true,
  })
  email: string;

  @Column({
    nullable: true,
  })
  plan: string; /*de contado, mensual inicial, mensual*/

  @Column({
    nullable: true,
  })
  facebook_url: string;

  @Column({
    nullable: true,
  })
  twitter_url: string;

  @Column({
    nullable: true,
  })
  instagram_url: string;

  @ManyToMany(type => User, user => user.companies)
  @JoinTable()
  users: User[];

  @OneToMany(() => Client, client => client.company)
  clients: Client[];
}