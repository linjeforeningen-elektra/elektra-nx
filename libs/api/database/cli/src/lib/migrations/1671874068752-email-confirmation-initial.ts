import { MigrationInterface, QueryRunner } from "typeorm";

export class emailConfirmationInitial1671874068752 implements MigrationInterface {
    name = 'emailConfirmationInitial1671874068752'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "email_confirmation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "code" character varying NOT NULL, "expiration" TIMESTAMP WITH TIME ZONE NOT NULL, "authLocalId" uuid NOT NULL, CONSTRAINT "REL_5b919c7cacbc317a614fd07ae3" UNIQUE ("authLocalId"), CONSTRAINT "PK_ff2b80a46c3992a0046b07c5456" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "auth-local" ADD "confirmed" boolean NOT NULL DEFAULT 'false'`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "auth-local" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "auth-local" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "auth-local" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "auth-local" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "card" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "card" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "card" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "card" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "access" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "access" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "access" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "access" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "access" ALTER COLUMN "sent" SET DEFAULT 'false'`);
        await queryRunner.query(`ALTER TABLE "membership" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "membership" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "membership" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "membership" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "block" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "block" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "block" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "block" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "block_revision" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "block_revision" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "block_revision" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "block_revision" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "email_confirmation" ADD CONSTRAINT "FK_5b919c7cacbc317a614fd07ae32" FOREIGN KEY ("authLocalId") REFERENCES "auth-local"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "email_confirmation" DROP CONSTRAINT "FK_5b919c7cacbc317a614fd07ae32"`);
        await queryRunner.query(`ALTER TABLE "block_revision" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "block_revision" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "block_revision" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "block_revision" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "block" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "block" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "block" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "block" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "membership" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "membership" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "membership" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "membership" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "access" ALTER COLUMN "sent" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "access" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "access" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "access" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "access" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "card" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "card" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "card" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "card" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "auth-local" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "auth-local" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "auth-local" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "auth-local" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "auth-local" DROP COLUMN "confirmed"`);
        await queryRunner.query(`DROP TABLE "email_confirmation"`);
    }

}
