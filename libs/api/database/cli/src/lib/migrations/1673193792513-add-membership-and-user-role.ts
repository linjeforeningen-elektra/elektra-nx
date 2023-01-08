import { MigrationInterface, QueryRunner } from "typeorm"

export class addMembershipAndUserRole1673193792513 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
        UPDATE "user"
        SET roles = array_append(roles, 'USER'::"AccessRole")
      `);

      await queryRunner.query(`
        UPDATE "user"
        SET roles = array_append(roles, 'MEMBER'::"AccessRole")
        WHERE id IN (
          SELECT
            u.id
          FROM
            "user" u
          INNER JOIN "membership" AS m
          ON
            m."userId" = u.id
          WHERE
            m.confirmed = 'true'
          )
      `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
        UPDATE "user"
        SET roles = array_remove(roles, 'USER'::"AccessRole")
      `);
      await queryRunner.query(`
        UPDATE "user"
        SET roles = array_remove(roles, 'MEMBER'::"AccessRole")
      `)
    }

}
