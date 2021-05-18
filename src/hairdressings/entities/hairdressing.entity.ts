import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { Patient } from '../../patients/entities/patient.entity';

@Entity()
export class Hairdressing {

    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    date: Date;
  
    @Column()
    reason: string;
  
    @Column()
    datail: string;

    @ManyToMany(type => Patient, patient => patient.hairdressings)
    @JoinTable()
    patients: Patient[];
}