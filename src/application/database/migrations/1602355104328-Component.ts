import { MigrationInterface, QueryRunner } from "typeorm";

export class Component1602355104328 implements MigrationInterface {
  name = "Component1602355104328"

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TYPE "component_phase_enum" AS ENUM(
        'Planning', 'In progress', 'Ready for testing', 
        'Completed', 'Canceled'
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "component" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
        "name" character varying(128) NOT NULL, 
        "description" character varying NOT NULL, 
        "spentTime" integer NOT NULL, 
        "estimatedTime" integer NOT NULL, 
        "phase" "component_phase_enum" NOT NULL DEFAULT 'Planning', 
        "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, 
        "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), 
        "deletedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), 
        "projectId" uuid, 
        CONSTRAINT "PK_c084eba2d3b157314de79135f09" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      ALTER TABLE 
        "component" 
      ADD 
        CONSTRAINT "FK_ec0c891dd9d626c7f783d4aef6e" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE NO ACTION
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("ALTER TABLE \"component\" DROP CONSTRAINT \"FK_ec0c891dd9d626c7f783d4aef6e\"");
    await queryRunner.query("DROP TABLE \"component\"");
    await queryRunner.query("DROP TYPE \"component_phase_enum\"");
  }
}
