import { MigrationInterface, QueryRunner } from "typeorm";

export class NullableProjectPreviewUrl1603545099185 implements MigrationInterface {
  name = "NullableProjectPreviewUrl1603545099185"

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER
        TABLE "project"
      ALTER
        COLUMN "previewUrl" DROP NOT NULL
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER
        TABLE "project"
      ALTER
        COLUMN "previewUrl" SET NOT NULL
    `);
  }
}
