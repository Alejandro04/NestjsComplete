import {MigrationInterface, QueryRunner} from "typeorm";

export class createConsultEntity1620734699831 implements MigrationInterface {
    name = 'createConsultEntity1620734699831'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "consult" ("id" SERIAL NOT NULL, "date" TIMESTAMP NOT NULL, "reason" character varying NOT NULL, "datail" character varying NOT NULL, CONSTRAINT "PK_5df94cf2cba21cfd42805ea5ccb" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "consult"`);
    }

}
