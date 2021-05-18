import {MigrationInterface, QueryRunner} from "typeorm";

export class init1621345473519 implements MigrationInterface {
    name = 'init1621345473519'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "users_role_enum" AS ENUM('admin', 'user')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" "users_role_enum" NOT NULL DEFAULT 'user', "profileImage" character varying, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "company" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "country" character varying, "phone1" character varying, "phone2" character varying, "email" character varying, "plan" character varying, "facebook_url" character varying, "twitter_url" character varying, "instagram_url" character varying, CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "consult" ("id" SERIAL NOT NULL, "date" TIMESTAMP NOT NULL, "reason" character varying NOT NULL, "datail" character varying NOT NULL, CONSTRAINT "PK_5df94cf2cba21cfd42805ea5ccb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "hairdressing" ("id" SERIAL NOT NULL, "date" TIMESTAMP NOT NULL, "reason" character varying NOT NULL, "datail" character varying NOT NULL, CONSTRAINT "PK_54bd39d115955cc6e94770731e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "patient" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "breed" character varying NOT NULL, "weight" character varying NOT NULL, "age" character varying NOT NULL, "sex" character varying NOT NULL, "species" character varying NOT NULL, "clientId" integer NOT NULL, CONSTRAINT "PK_8dfa510bb29ad31ab2139fbfb99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "client" ("id" SERIAL NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "dni" character varying NOT NULL, "phone1" character varying, "phone2" character varying, "companyId" integer NOT NULL, CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "company_users_users" ("companyId" integer NOT NULL, "usersId" integer NOT NULL, CONSTRAINT "PK_f5c92ef89a49984143f37b67455" PRIMARY KEY ("companyId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_8ec948dfb19096ed9ac739ada3" ON "company_users_users" ("companyId") `);
        await queryRunner.query(`CREATE INDEX "IDX_e200d0a39f6ea44b345f6e1ff5" ON "company_users_users" ("usersId") `);
        await queryRunner.query(`CREATE TABLE "consult_patients_patient" ("consultId" integer NOT NULL, "patientId" integer NOT NULL, CONSTRAINT "PK_00a77f92b812f2252bc2ce01e4b" PRIMARY KEY ("consultId", "patientId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_13f655fdda75be9c71235a4a11" ON "consult_patients_patient" ("consultId") `);
        await queryRunner.query(`CREATE INDEX "IDX_5df161eba6e335d39a94e5fcbb" ON "consult_patients_patient" ("patientId") `);
        await queryRunner.query(`CREATE TABLE "patient_hairdressings_hairdressing" ("patientId" integer NOT NULL, "hairdressingId" integer NOT NULL, CONSTRAINT "PK_3c97cc9b52b9959a794d9fa74fc" PRIMARY KEY ("patientId", "hairdressingId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_430b557cdb58ac5fa63f7210b6" ON "patient_hairdressings_hairdressing" ("patientId") `);
        await queryRunner.query(`CREATE INDEX "IDX_82129cfea0d92b2b120bfe1310" ON "patient_hairdressings_hairdressing" ("hairdressingId") `);
        await queryRunner.query(`ALTER TABLE "patient" ADD CONSTRAINT "FK_1aea8c858848a3eda3a3f27ee72" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "client" ADD CONSTRAINT "FK_3d7a0b6e0f1d0c0ab1bc189645f" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "company_users_users" ADD CONSTRAINT "FK_8ec948dfb19096ed9ac739ada36" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "company_users_users" ADD CONSTRAINT "FK_e200d0a39f6ea44b345f6e1ff54" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "consult_patients_patient" ADD CONSTRAINT "FK_13f655fdda75be9c71235a4a111" FOREIGN KEY ("consultId") REFERENCES "consult"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "consult_patients_patient" ADD CONSTRAINT "FK_5df161eba6e335d39a94e5fcbb7" FOREIGN KEY ("patientId") REFERENCES "patient"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "patient_hairdressings_hairdressing" ADD CONSTRAINT "FK_430b557cdb58ac5fa63f7210b62" FOREIGN KEY ("patientId") REFERENCES "patient"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "patient_hairdressings_hairdressing" ADD CONSTRAINT "FK_82129cfea0d92b2b120bfe13103" FOREIGN KEY ("hairdressingId") REFERENCES "hairdressing"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "patient_hairdressings_hairdressing" DROP CONSTRAINT "FK_82129cfea0d92b2b120bfe13103"`);
        await queryRunner.query(`ALTER TABLE "patient_hairdressings_hairdressing" DROP CONSTRAINT "FK_430b557cdb58ac5fa63f7210b62"`);
        await queryRunner.query(`ALTER TABLE "consult_patients_patient" DROP CONSTRAINT "FK_5df161eba6e335d39a94e5fcbb7"`);
        await queryRunner.query(`ALTER TABLE "consult_patients_patient" DROP CONSTRAINT "FK_13f655fdda75be9c71235a4a111"`);
        await queryRunner.query(`ALTER TABLE "company_users_users" DROP CONSTRAINT "FK_e200d0a39f6ea44b345f6e1ff54"`);
        await queryRunner.query(`ALTER TABLE "company_users_users" DROP CONSTRAINT "FK_8ec948dfb19096ed9ac739ada36"`);
        await queryRunner.query(`ALTER TABLE "client" DROP CONSTRAINT "FK_3d7a0b6e0f1d0c0ab1bc189645f"`);
        await queryRunner.query(`ALTER TABLE "patient" DROP CONSTRAINT "FK_1aea8c858848a3eda3a3f27ee72"`);
        await queryRunner.query(`DROP INDEX "IDX_82129cfea0d92b2b120bfe1310"`);
        await queryRunner.query(`DROP INDEX "IDX_430b557cdb58ac5fa63f7210b6"`);
        await queryRunner.query(`DROP TABLE "patient_hairdressings_hairdressing"`);
        await queryRunner.query(`DROP INDEX "IDX_5df161eba6e335d39a94e5fcbb"`);
        await queryRunner.query(`DROP INDEX "IDX_13f655fdda75be9c71235a4a11"`);
        await queryRunner.query(`DROP TABLE "consult_patients_patient"`);
        await queryRunner.query(`DROP INDEX "IDX_e200d0a39f6ea44b345f6e1ff5"`);
        await queryRunner.query(`DROP INDEX "IDX_8ec948dfb19096ed9ac739ada3"`);
        await queryRunner.query(`DROP TABLE "company_users_users"`);
        await queryRunner.query(`DROP TABLE "client"`);
        await queryRunner.query(`DROP TABLE "patient"`);
        await queryRunner.query(`DROP TABLE "hairdressing"`);
        await queryRunner.query(`DROP TABLE "consult"`);
        await queryRunner.query(`DROP TABLE "company"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "users_role_enum"`);
    }

}
