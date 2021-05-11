import {MigrationInterface, QueryRunner} from "typeorm";

export class createPatientsConsultsRelations1620734964762 implements MigrationInterface {
    name = 'createPatientsConsultsRelations1620734964762'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "patient_consults_consult" ("patientId" integer NOT NULL, "consultId" integer NOT NULL, CONSTRAINT "PK_cbaf4d854d8bbb5f0a0516e6ce2" PRIMARY KEY ("patientId", "consultId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b30e1433d335e61356011067cd" ON "patient_consults_consult" ("patientId") `);
        await queryRunner.query(`CREATE INDEX "IDX_e9ad60a19d116297de915cece7" ON "patient_consults_consult" ("consultId") `);
        await queryRunner.query(`ALTER TABLE "patient_consults_consult" ADD CONSTRAINT "FK_b30e1433d335e61356011067cd6" FOREIGN KEY ("patientId") REFERENCES "patient"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "patient_consults_consult" ADD CONSTRAINT "FK_e9ad60a19d116297de915cece7c" FOREIGN KEY ("consultId") REFERENCES "consult"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "patient_consults_consult" DROP CONSTRAINT "FK_e9ad60a19d116297de915cece7c"`);
        await queryRunner.query(`ALTER TABLE "patient_consults_consult" DROP CONSTRAINT "FK_b30e1433d335e61356011067cd6"`);
        await queryRunner.query(`DROP INDEX "IDX_e9ad60a19d116297de915cece7"`);
        await queryRunner.query(`DROP INDEX "IDX_b30e1433d335e61356011067cd"`);
        await queryRunner.query(`DROP TABLE "patient_consults_consult"`);
    }

}
