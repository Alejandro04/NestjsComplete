import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, ManyToMany } from "typeorm";
import { UserRole } from "./user.interface";
import { Company } from "../../companies/entities/company.entity";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    username: string;

    @Column({unique: true})
    email: string;

    @Column({select: false})
    password: string;

    @Column({type: 'enum', enum: UserRole, default: UserRole.USER})
    role: UserRole;

    @Column({nullable: true})
    profileImage: string;

    @BeforeInsert()
    emailToLowerCase() {
        this.email = this.email.toLowerCase();
    }

    @ManyToMany(type => Company, company => company.users)
    companies: Company[];
}