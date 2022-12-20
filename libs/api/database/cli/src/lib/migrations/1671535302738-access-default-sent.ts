import { MigrationInterface, QueryRunner } from "typeorm";

export class accessDefaultSent1671535302738 implements MigrationInterface {
    name = 'accessDefaultSent1671535302738'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "access" ALTER COLUMN "sent" SET DEFAULT 'false'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "access" ALTER COLUMN "sent" SET DEFAULT false`);
    }

}
