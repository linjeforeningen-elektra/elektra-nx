import { MigrationInterface, QueryRunner } from "typeorm";

export class membershipRefactor1688898058758 implements MigrationInterface {
    name = 'membershipRefactor1688898058758'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "membership" DROP COLUMN "confirmed"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "last_signed_in" SET DEFAULT 'NOW()'`);
        await queryRunner.query(`ALTER TABLE "auth-local" ALTER COLUMN "confirmed" SET DEFAULT 'false'`);
        await queryRunner.query(`ALTER TABLE "access" ALTER COLUMN "sent" SET DEFAULT 'false'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "access" ALTER COLUMN "sent" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "auth-local" ALTER COLUMN "confirmed" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "last_signed_in" SET DEFAULT '2023-01-11 09:18:27.217593+00'`);
        await queryRunner.query(`ALTER TABLE "membership" ADD "confirmed" boolean NOT NULL DEFAULT false`);
    }

}
