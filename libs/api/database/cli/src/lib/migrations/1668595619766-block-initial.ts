import { MigrationInterface, QueryRunner } from "typeorm";

export class blockInitial1668595619766 implements MigrationInterface {
    name = 'blockInitial1668595619766'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "block" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "ownerId" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedBy" character varying, "slug" character varying, CONSTRAINT "UQ_block_slug" UNIQUE ("slug"), CONSTRAINT "PK_d0925763efb591c2e2ffb267572" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "block_revision" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "ownerId" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedBy" character varying, "content" text NOT NULL, "version" smallint NOT NULL DEFAULT '1', "blockId" uuid NOT NULL, "createdById" uuid, CONSTRAINT "PK_8e512f6a5fca1ef76fcabad12df" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "access" ALTER COLUMN "sent" SET DEFAULT 'false'`);
        await queryRunner.query(`ALTER TABLE "block_revision" ADD CONSTRAINT "FK_da5855c3f0add1a6d6a62c21882" FOREIGN KEY ("blockId") REFERENCES "block"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "block_revision" ADD CONSTRAINT "FK_d4b163d62138fbdc30c46d16631" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "block_revision" DROP CONSTRAINT "FK_d4b163d62138fbdc30c46d16631"`);
        await queryRunner.query(`ALTER TABLE "block_revision" DROP CONSTRAINT "FK_da5855c3f0add1a6d6a62c21882"`);
        await queryRunner.query(`ALTER TABLE "access" ALTER COLUMN "sent" SET DEFAULT false`);
        await queryRunner.query(`DROP TABLE "block_revision"`);
        await queryRunner.query(`DROP TABLE "block"`);
    }

}
