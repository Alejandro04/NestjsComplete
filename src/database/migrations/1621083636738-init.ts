import {MigrationInterface, QueryRunner} from "typeorm";

export class init1621083636738 implements MigrationInterface {
    name = 'init1621083636738'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "user_role_enum" AS ENUM('admin', 'user')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" "user_role_enum" NOT NULL DEFAULT 'user', "profileImage" character varying, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "company" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "country" character varying, "phone1" character varying, "phone2" character varying, "email" character varying, "plan" character varying, "facebook_url" character varying, "twitter_url" character varying, "instagram_url" character varying, CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "consult" ("id" SERIAL NOT NULL, "date" TIMESTAMP NOT NULL, "reason" character varying NOT NULL, "datail" character varying NOT NULL, CONSTRAINT "PK_5df94cf2cba21cfd42805ea5ccb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "hairdressing" ("id" SERIAL NOT NULL, "date" TIMESTAMP NOT NULL, "reason" character varying NOT NULL, "datail" character varying NOT NULL, CONSTRAINT "PK_54bd39d115955cc6e94770731e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "patient" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "breed" character varying NOT NULL, "weight" character varying NOT NULL, "age" character varying NOT NULL, "sex" character varying NOT NULL, "species" character varying NOT NULL, "clientId" integer, CONSTRAINT "PK_8dfa510bb29ad31ab2139fbfb99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "client" ("id" SERIAL NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "dni" character varying NOT NULL, "phone1" character varying, "phone2" character varying, "companyId" integer, CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "company_users_user" ("companyId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_0d4bf59b58aff38908cabae569b" PRIMARY KEY ("companyId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f1e47d3e0eba4ccac82ffa9061" ON "company_users_user" ("companyId") `);
        await queryRunner.query(`CREATE INDEX "IDX_2c9d284df04dbf84e9f14a0a6f" ON "company_users_user" ("userId") `);
        await queryRunner.query(`CREATE TABLE "patient_consults_consult" ("patientId" integer NOT NULL, "consultId" integer NOT NULL, CONSTRAINT "PK_cbaf4d854d8bbb5f0a0516e6ce2" PRIMARY KEY ("patientId", "consultId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b30e1433d335e61356011067cd" ON "patient_consults_consult" ("patientId") `);
        await queryRunner.query(`CREATE INDEX "IDX_e9ad60a19d116297de915cece7" ON "patient_consults_consult" ("consultId") `);
        await queryRunner.query(`CREATE TABLE "patient_hairdressings_hairdressing" ("patientId" integer NOT NULL, "hairdressingId" integer NOT NULL, CONSTRAINT "PK_3c97cc9b52b9959a794d9fa74fc" PRIMARY KEY ("patientId", "hairdressingId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_430b557cdb58ac5fa63f7210b6" ON "patient_hairdressings_hairdressing" ("patientId") `);
        await queryRunner.query(`CREATE INDEX "IDX_82129cfea0d92b2b120bfe1310" ON "patient_hairdressings_hairdressing" ("hairdressingId") `);
        await queryRunner.query(`ALTER TABLE "patient" ADD CONSTRAINT "FK_1aea8c858848a3eda3a3f27ee72" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "client" ADD CONSTRAINT "FK_3d7a0b6e0f1d0c0ab1bc189645f" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "company_users_user" ADD CONSTRAINT "FK_f1e47d3e0eba4ccac82ffa90613" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "company_users_user" ADD CONSTRAINT "FK_2c9d284df04dbf84e9f14a0a6f3" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "patient_consults_consult" ADD CONSTRAINT "FK_b30e1433d335e61356011067cd6" FOREIGN KEY ("patientId") REFERENCES "patient"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "patient_consults_consult" ADD CONSTRAINT "FK_e9ad60a19d116297de915cece7c" FOREIGN KEY ("consultId") REFERENCES "consult"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "patient_hairdressings_hairdressing" ADD CONSTRAINT "FK_430b557cdb58ac5fa63f7210b62" FOREIGN KEY ("patientId") REFERENCES "patient"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "patient_hairdressings_hairdressing" ADD CONSTRAINT "FK_82129cfea0d92b2b120bfe13103" FOREIGN KEY ("hairdressingId") REFERENCES "hairdressing"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "patient_hairdressings_hairdressing" DROP CONSTRAINT "FK_82129cfea0d92b2b120bfe13103"`);
        await queryRunner.query(`ALTER TABLE "patient_hairdressings_hairdressing" DROP CONSTRAINT "FK_430b557cdb58ac5fa63f7210b62"`);
        await queryRunner.query(`ALTER TABLE "patient_consults_consult" DROP CONSTRAINT "FK_e9ad60a19d116297de915cece7c"`);
        await queryRunner.query(`ALTER TABLE "patient_consults_consult" DROP CONSTRAINT "FK_b30e1433d335e61356011067cd6"`);
        await queryRunner.query(`ALTER TABLE "company_users_user" DROP CONSTRAINT "FK_2c9d284df04dbf84e9f14a0a6f3"`);
        await queryRunner.query(`ALTER TABLE "company_users_user" DROP CONSTRAINT "FK_f1e47d3e0eba4ccac82ffa90613"`);
        await queryRunner.query(`ALTER TABLE "client" DROP CONSTRAINT "FK_3d7a0b6e0f1d0c0ab1bc189645f"`);
        await queryRunner.query(`ALTER TABLE "patient" DROP CONSTRAINT "FK_1aea8c858848a3eda3a3f27ee72"`);
        await queryRunner.query(`DROP INDEX "IDX_82129cfea0d92b2b120bfe1310"`);
        await queryRunner.query(`DROP INDEX "IDX_430b557cdb58ac5fa63f7210b6"`);
        await queryRunner.query(`DROP TABLE "patient_hairdressings_hairdressing"`);
        await queryRunner.query(`DROP INDEX "IDX_e9ad60a19d116297de915cece7"`);
        await queryRunner.query(`DROP INDEX "IDX_b30e1433d335e61356011067cd"`);
        await queryRunner.query(`DROP TABLE "patient_consults_consult"`);
        await queryRunner.query(`DROP INDEX "IDX_2c9d284df04dbf84e9f14a0a6f"`);
        await queryRunner.query(`DROP INDEX "IDX_f1e47d3e0eba4ccac82ffa9061"`);
        await queryRunner.query(`DROP TABLE "company_users_user"`);
        await queryRunner.query(`DROP TABLE "client"`);
        await queryRunner.query(`DROP TABLE "patient"`);
        await queryRunner.query(`DROP TABLE "hairdressing"`);
        await queryRunner.query(`DROP TABLE "consult"`);
        await queryRunner.query(`DROP TABLE "company"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "user_role_enum"`);
    }

}
