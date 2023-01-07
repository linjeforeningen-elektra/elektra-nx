import { MigrationInterface, QueryRunner } from "typeorm";

export class passwordResetInitial1673115812316 implements MigrationInterface {
    name = 'passwordResetInitial1673115812316'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "email_confirmation" DROP CONSTRAINT "FK_5b919c7cacbc317a614fd07ae32"`);
        await queryRunner.query(`CREATE TABLE "password_reset" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "hash" character varying NOT NULL, "expires" TIMESTAMP WITH TIME ZONE NOT NULL, "authLocalId" uuid NOT NULL, CONSTRAINT "UQ_password_reset_hash" UNIQUE ("hash"), CONSTRAINT "PK_8515e60a2cc41584fa4784f52ce" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "auth-local" ALTER COLUMN "confirmed" SET DEFAULT 'false'`);
        await queryRunner.query(`ALTER TABLE "access" ALTER COLUMN "sent" SET DEFAULT 'false'`);
        await queryRunner.query(`ALTER TABLE "email_confirmation" ADD CONSTRAINT "FK_5b919c7cacbc317a614fd07ae32" FOREIGN KEY ("authLocalId") REFERENCES "auth-local"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "password_reset" ADD CONSTRAINT "FK_17586ebf9269e9050f82720641b" FOREIGN KEY ("authLocalId") REFERENCES "auth-local"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "password_reset" DROP CONSTRAINT "FK_17586ebf9269e9050f82720641b"`);
        await queryRunner.query(`ALTER TABLE "email_confirmation" DROP CONSTRAINT "FK_5b919c7cacbc317a614fd07ae32"`);
        await queryRunner.query(`ALTER TABLE "access" ALTER COLUMN "sent" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "auth-local" ALTER COLUMN "confirmed" SET DEFAULT false`);
        await queryRunner.query(`DROP TABLE "password_reset"`);
        await queryRunner.query(`ALTER TABLE "email_confirmation" ADD CONSTRAINT "FK_5b919c7cacbc317a614fd07ae32" FOREIGN KEY ("authLocalId") REFERENCES "auth-local"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
