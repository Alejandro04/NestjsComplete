import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Company } from '../../companies/entities/company.entity';

@Entity()
export class Client {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  dni: string;

  @Column({
    nullable: true,
  })
  phone1: string;

  @Column({
    nullable: true,
  })
  phone2: string;

  @ManyToOne(() => Company, company => company.clients)
  company: Company;
}