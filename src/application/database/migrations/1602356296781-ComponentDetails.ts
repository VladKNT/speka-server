import { MigrationInterface, QueryRunner } from "typeorm";

export class ComponentDetails1602356296781 implements MigrationInterface {
  name = "ComponentDetails1602356296781"

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "componentDetails" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
        "features" character varying NOT NULL DEFAULT '', 
        "futureFeatures" character varying NOT NULL DEFAULT '', 
        "notes" character varying NOT NULL DEFAULT '', 
        "requirements" character varying NOT NULL DEFAULT '', 
        "version" integer NOT NULL, 
        "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, 
        "componentId" uuid, 
        CONSTRAINT "PK_d2a570b8febcf217a8d080dffb4" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      ALTER TABLE 
        "componentDetails" 
      ADD 
        CONSTRAINT "FK_5426723d24f3e7a73e99e3e731c" FOREIGN KEY ("componentId") REFERENCES "component"("id") ON DELETE CASCADE ON UPDATE NO ACTION
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("ALTER TABLE \"componentDetails\" DROP CONSTRAINT \"FK_5426723d24f3e7a73e99e3e731c\"");
    await queryRunner.query("DROP TABLE \"componentDetails\"");
  }
}
