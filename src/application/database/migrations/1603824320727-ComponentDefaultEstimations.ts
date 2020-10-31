import { MigrationInterface, QueryRunner } from "typeorm";

export class ComponentDefaultEstimations1603824320727 implements MigrationInterface {
  name = "ComponentDefaultEstimations1603824320727"

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER
        TABLE "component"
      ALTER
        COLUMN "spentTime" SET DEFAULT 0
    `);

    await queryRunner.query(`
      ALTER
        TABLE "component"
      ALTER
        COLUMN "estimatedTime" SET DEFAULT 0
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER
        TABLE "component"
      ALTER
        COLUMN "estimatedTime" DROP DEFAULT
    `);

    await queryRunner.query(`
      ALTER
        TABLE "component"
      ALTER
        COLUMN "spentTime" DROP DEFAULT
    `);
  }
}
