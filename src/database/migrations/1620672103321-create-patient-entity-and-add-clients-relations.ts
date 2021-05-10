import {MigrationInterface, QueryRunner} from "typeorm";

export class createPatientEntityAndAddClientsRelations1620672103321 implements MigrationInterface {
    name = 'createPatientEntityAndAddClientsRelations1620672103321'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "patient" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "breed" character varying NOT NULL, "weight" character varying NOT NULL, "age" character varying NOT NULL, "sex" character varying NOT NULL, "species" character varying NOT NULL, "clientId" integer, CONSTRAINT "PK_8dfa510bb29ad31ab2139fbfb99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "patient" ADD CONSTRAINT "FK_1aea8c858848a3eda3a3f27ee72" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "patient" DROP CONSTRAINT "FK_1aea8c858848a3eda3a3f27ee72"`);
        await queryRunner.query(`DROP TABLE "patient"`);
    }

}
