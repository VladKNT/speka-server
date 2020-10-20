import { MigrationInterface, QueryRunner } from "typeorm";

export class UserDetailsCascade1603122306035 implements MigrationInterface {
  name = "UserDetailsCascade1603122306035"

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER
        TABLE "userDetails"
      ALTER 
        COLUMN "avatarUrl" DROP NOT NULL
    `);

    await queryRunner.query(`
      ALTER
        TABLE "user"
      ADD
        CONSTRAINT "UQ_7b77f11257bfa94540c0eebfd59" UNIQUE ("contactNumber")
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER
        TABLE "user"
      DROP
        CONSTRAINT "UQ_7b77f11257bfa94540c0eebfd59"
    `);

    await queryRunner.query(`
      ALTER
        TABLE "userDetails"
      ALTER
        COLUMN "avatarUrl" SET NOT NULL
    `);
  }
}
