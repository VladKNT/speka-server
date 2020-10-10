import { MigrationInterface, QueryRunner } from "typeorm";

export class ComponentAssignee1602356987430 implements MigrationInterface {
  name = "ComponentAssignee1602356987430"

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "componentAssignee" (
        "userId" uuid NOT NULL, 
        "componentId" uuid NOT NULL, 
        CONSTRAINT "PK_fb087aea985451388641d5296b4" PRIMARY KEY ("userId", "componentId")
      )
    `);

    await queryRunner.query(`
      CREATE
        INDEX "IDX_ad0e47c25b9fdda9eb667419bb"
      ON
        "componentAssignee" ("userId")
    `);

    await queryRunner.query(`
      CREATE
        INDEX "IDX_bd84f24374878af5f8c2a0ee94"
      ON
        "componentAssignee" ("componentId")
    `);

    await queryRunner.query(`
      ALTER TABLE 
        "componentAssignee" 
      ADD 
        CONSTRAINT "FK_ad0e47c25b9fdda9eb667419bb5" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION
    `);

    await queryRunner.query(`
      ALTER TABLE 
        "componentAssignee" 
      ADD 
        CONSTRAINT "FK_bd84f24374878af5f8c2a0ee940" FOREIGN KEY ("componentId") REFERENCES "component"("id") ON DELETE CASCADE ON UPDATE NO ACTION
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("ALTER TABLE \"componentAssignee\" DROP CONSTRAINT \"FK_bd84f24374878af5f8c2a0ee940\"");
    await queryRunner.query("ALTER TABLE \"componentAssignee\" DROP CONSTRAINT \"FK_ad0e47c25b9fdda9eb667419bb5\"");
    await queryRunner.query("DROP INDEX \"IDX_bd84f24374878af5f8c2a0ee94\"");
    await queryRunner.query("DROP INDEX \"IDX_ad0e47c25b9fdda9eb667419bb\"");
    await queryRunner.query("DROP TABLE \"componentAssignee\"");
  }
}
