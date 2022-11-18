import { MigrationInterface, QueryRunner } from "typeorm";

export class blockTypeRefactor1668803029252 implements MigrationInterface {
    name = 'blockTypeRefactor1668803029252'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."block_revision_type_enum" AS ENUM('TEXT')`);
        await queryRunner.query(`ALTER TABLE "block_revision" ADD "type" "public"."block_revision_type_enum" NOT NULL DEFAULT 'TEXT'`);
        await queryRunner.query(`ALTER TABLE "access" ALTER COLUMN "sent" SET DEFAULT 'false'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "access" ALTER COLUMN "sent" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "block_revision" DROP COLUMN "type"`);
        await queryRunner.query(`DROP TYPE "public"."block_revision_type_enum"`);
    }

}
