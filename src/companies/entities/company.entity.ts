import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

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
}