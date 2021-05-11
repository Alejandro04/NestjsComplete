import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

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
}