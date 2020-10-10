import { MigrationInterface, QueryRunner } from "typeorm";

export class Role1602321076987 implements MigrationInterface {
  name = "Role1602321076987"

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TYPE "role_name_enum" AS ENUM(
        'Admin', 'Assistant', 'Project Manager'
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "role" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
        "name" "role_name_enum" NOT NULL DEFAULT 'Assistant', 
        CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      ALTER TABLE
        "user"
      ADD 
        "roleId" uuid
    `);

    await queryRunner.query(`
      ALTER TABLE 
        "user" 
      ADD 
        CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE
        "user"
      DROP 
        CONSTRAINT "FK_c28e52f758e7bbc53828db92194"
    `);

    await queryRunner.query(`
      ALTER TABLE
        "user"
      DROP COLUMN
        "roleId"
      `);

    await queryRunner.query("DROP TABLE \"role\"");
    await queryRunner.query("DROP TYPE \"role_name_enum\"");
  }
}
