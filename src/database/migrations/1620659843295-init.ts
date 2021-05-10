import {MigrationInterface, QueryRunner} from "typeorm";

export class init1620659843295 implements MigrationInterface {
    name = 'init1620659843295'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "category" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "user_role_enum" AS ENUM('admin', 'user')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" "user_role_enum" NOT NULL DEFAULT 'user', "profileImage" character varying, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "company" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "country" character varying, "phone1" character varying, "phone2" character varying, "email" character varying, "plan" character varying, "facebook_url" character varying, "twitter_url" character varying, "instagram_url" character varying, CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "task" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "completed" boolean NOT NULL DEFAULT false, "creation_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "company_users_user" ("companyId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_0d4bf59b58aff38908cabae569b" PRIMARY KEY ("companyId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f1e47d3e0eba4ccac82ffa9061" ON "company_users_user" ("companyId") `);
        await queryRunner.query(`CREATE INDEX "IDX_2c9d284df04dbf84e9f14a0a6f" ON "company_users_user" ("userId") `);
        await queryRunner.query(`CREATE TABLE "task_categories_category" ("taskId" integer NOT NULL, "categoryId" integer NOT NULL, CONSTRAINT "PK_1372634eccb70bb5caf3cf9658f" PRIMARY KEY ("taskId", "categoryId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2056dac1666845d896a91625bf" ON "task_categories_category" ("taskId") `);
        await queryRunner.query(`CREATE INDEX "IDX_c0246f9ff610eb0a727c5a5287" ON "task_categories_category" ("categoryId") `);
        await queryRunner.query(`ALTER TABLE "company_users_user" ADD CONSTRAINT "FK_f1e47d3e0eba4ccac82ffa90613" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "company_users_user" ADD CONSTRAINT "FK_2c9d284df04dbf84e9f14a0a6f3" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task_categories_category" ADD CONSTRAINT "FK_2056dac1666845d896a91625bf9" FOREIGN KEY ("taskId") REFERENCES "task"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task_categories_category" ADD CONSTRAINT "FK_c0246f9ff610eb0a727c5a52877" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task_categories_category" DROP CONSTRAINT "FK_c0246f9ff610eb0a727c5a52877"`);
        await queryRunner.query(`ALTER TABLE "task_categories_category" DROP CONSTRAINT "FK_2056dac1666845d896a91625bf9"`);
        await queryRunner.query(`ALTER TABLE "company_users_user" DROP CONSTRAINT "FK_2c9d284df04dbf84e9f14a0a6f3"`);
        await queryRunner.query(`ALTER TABLE "company_users_user" DROP CONSTRAINT "FK_f1e47d3e0eba4ccac82ffa90613"`);
        await queryRunner.query(`DROP INDEX "IDX_c0246f9ff610eb0a727c5a5287"`);
        await queryRunner.query(`DROP INDEX "IDX_2056dac1666845d896a91625bf"`);
        await queryRunner.query(`DROP TABLE "task_categories_category"`);
        await queryRunner.query(`DROP INDEX "IDX_2c9d284df04dbf84e9f14a0a6f"`);
        await queryRunner.query(`DROP INDEX "IDX_f1e47d3e0eba4ccac82ffa9061"`);
        await queryRunner.query(`DROP TABLE "company_users_user"`);
        await queryRunner.query(`DROP TABLE "task"`);
        await queryRunner.query(`DROP TABLE "company"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "user_role_enum"`);
        await queryRunner.query(`DROP TABLE "category"`);
    }

}
