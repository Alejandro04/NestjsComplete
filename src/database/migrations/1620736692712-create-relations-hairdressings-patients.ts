import {MigrationInterface, QueryRunner} from "typeorm";

export class createRelationsHairdressingsPatients1620736692712 implements MigrationInterface {
    name = 'createRelationsHairdressingsPatients1620736692712'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "hairdressing" ("id" SERIAL NOT NULL, "date" TIMESTAMP NOT NULL, "reason" character varying NOT NULL, "datail" character varying NOT NULL, CONSTRAINT "PK_54bd39d115955cc6e94770731e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "patient_hairdressings_hairdressing" ("patientId" integer NOT NULL, "hairdressingId" integer NOT NULL, CONSTRAINT "PK_3c97cc9b52b9959a794d9fa74fc" PRIMARY KEY ("patientId", "hairdressingId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_430b557cdb58ac5fa63f7210b6" ON "patient_hairdressings_hairdressing" ("patientId") `);
        await queryRunner.query(`CREATE INDEX "IDX_82129cfea0d92b2b120bfe1310" ON "patient_hairdressings_hairdressing" ("hairdressingId") `);
        await queryRunner.query(`ALTER TABLE "patient_hairdressings_hairdressing" ADD CONSTRAINT "FK_430b557cdb58ac5fa63f7210b62" FOREIGN KEY ("patientId") REFERENCES "patient"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "patient_hairdressings_hairdressing" ADD CONSTRAINT "FK_82129cfea0d92b2b120bfe13103" FOREIGN KEY ("hairdressingId") REFERENCES "hairdressing"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "patient_hairdressings_hairdressing" DROP CONSTRAINT "FK_82129cfea0d92b2b120bfe13103"`);
        await queryRunner.query(`ALTER TABLE "patient_hairdressings_hairdressing" DROP CONSTRAINT "FK_430b557cdb58ac5fa63f7210b62"`);
        await queryRunner.query(`DROP INDEX "IDX_82129cfea0d92b2b120bfe1310"`);
        await queryRunner.query(`DROP INDEX "IDX_430b557cdb58ac5fa63f7210b6"`);
        await queryRunner.query(`DROP TABLE "patient_hairdressings_hairdressing"`);
        await queryRunner.query(`DROP TABLE "hairdressing"`);
    }

}
