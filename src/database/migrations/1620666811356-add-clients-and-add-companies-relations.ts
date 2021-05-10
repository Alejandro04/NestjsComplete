import {MigrationInterface, QueryRunner} from "typeorm";

export class addClientsAndAddCompaniesRelations1620666811356 implements MigrationInterface {
    name = 'addClientsAndAddCompaniesRelations1620666811356'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "client" ("id" SERIAL NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "dni" character varying NOT NULL, "phone1" character varying, "phone2" character varying, "companyId" integer, CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "client" ADD CONSTRAINT "FK_3d7a0b6e0f1d0c0ab1bc189645f" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "client" DROP CONSTRAINT "FK_3d7a0b6e0f1d0c0ab1bc189645f"`);
        await queryRunner.query(`DROP TABLE "client"`);
    }

}
