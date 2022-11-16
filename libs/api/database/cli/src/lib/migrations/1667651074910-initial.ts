import { MigrationInterface, QueryRunner } from "typeorm";

export class initial1667651074910 implements MigrationInterface {
    name = 'initial1667651074910'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."AccessRole" AS ENUM('SUPER_ADMIN', 'ADMIN', 'MEMBER', 'USER', 'ANONYMOUS')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "ownerId" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedBy" character varying, "slug" character varying, "name" character varying NOT NULL, "roles" "public"."AccessRole" array NOT NULL DEFAULT '{}', CONSTRAINT "UQ_user_slug" UNIQUE ("slug"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "auth-local" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "ownerId" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedBy" character varying, "email" character varying NOT NULL, "salt" character varying NOT NULL, "hash" character varying NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "UQ_auth_local_email" UNIQUE ("email"), CONSTRAINT "REL_2cd78a9500024f9b9b2fe7ca63" UNIQUE ("userId"), CONSTRAINT "PK_24784911cd1477ee5a4f9c41e07" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "card" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "ownerId" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedBy" character varying, "student_number" character varying NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "REL_77d7cc9d95dccd574d71ba221b" UNIQUE ("userId"), CONSTRAINT "PK_9451069b6f1199730791a7f4ae4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "access" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "ownerId" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedBy" character varying, "expiration" TIMESTAMP NOT NULL, "sent" boolean NOT NULL DEFAULT 'false', "cardId" uuid NOT NULL, CONSTRAINT "PK_e386259e6046c45ab06811584ed" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."Specialization" AS ENUM('Automation', 'Elektronics and Sensorsystems', 'Electric Power Engineering')`);
        await queryRunner.query(`CREATE TABLE "membership" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "ownerId" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedBy" character varying, "phone" character varying NOT NULL, "address" character varying NOT NULL, "postal_code" character varying NOT NULL, "gender" character varying, "immatriculation" TIMESTAMP, "memberyear" TIMESTAMP NOT NULL, "graduation" TIMESTAMP, "confirmed" boolean NOT NULL DEFAULT false, "specialisation" "public"."Specialization", "userId" uuid NOT NULL, CONSTRAINT "REL_eef2d9d9c70cd13bed868afedf" UNIQUE ("userId"), CONSTRAINT "PK_83c1afebef3059472e7c37e8de8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "auth-local" ADD CONSTRAINT "FK_2cd78a9500024f9b9b2fe7ca636" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "card" ADD CONSTRAINT "FK_77d7cc9d95dccd574d71ba221b0" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "access" ADD CONSTRAINT "FK_6fc8e15894e20c709a66a9e95e6" FOREIGN KEY ("cardId") REFERENCES "card"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "membership" ADD CONSTRAINT "FK_eef2d9d9c70cd13bed868afedf4" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "membership" DROP CONSTRAINT "FK_eef2d9d9c70cd13bed868afedf4"`);
        await queryRunner.query(`ALTER TABLE "access" DROP CONSTRAINT "FK_6fc8e15894e20c709a66a9e95e6"`);
        await queryRunner.query(`ALTER TABLE "card" DROP CONSTRAINT "FK_77d7cc9d95dccd574d71ba221b0"`);
        await queryRunner.query(`ALTER TABLE "auth-local" DROP CONSTRAINT "FK_2cd78a9500024f9b9b2fe7ca636"`);
        await queryRunner.query(`DROP TABLE "membership"`);
        await queryRunner.query(`DROP TYPE "public"."Specialization"`);
        await queryRunner.query(`DROP TABLE "access"`);
        await queryRunner.query(`DROP TABLE "card"`);
        await queryRunner.query(`DROP TABLE "auth-local"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."AccessRole"`);
    }

}
