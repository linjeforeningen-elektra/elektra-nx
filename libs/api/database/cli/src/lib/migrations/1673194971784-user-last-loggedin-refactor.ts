import { MigrationInterface, QueryRunner } from "typeorm";

export class userLastLoggedinRefactor1673194971784 implements MigrationInterface {
    name = 'userLastLoggedinRefactor1673194971784'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "last_signed_in" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT 'NOW()'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "roles" SET DEFAULT '{USER}'`);
        await queryRunner.query(`ALTER TABLE "auth-local" ALTER COLUMN "confirmed" SET DEFAULT 'false'`);
        await queryRunner.query(`ALTER TABLE "access" ALTER COLUMN "sent" SET DEFAULT 'false'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "access" ALTER COLUMN "sent" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "auth-local" ALTER COLUMN "confirmed" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "roles" SET DEFAULT '{}'`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "last_signed_in"`);
    }

}
