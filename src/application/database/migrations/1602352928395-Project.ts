import { MigrationInterface, QueryRunner } from "typeorm";

export class Project1602352928395 implements MigrationInterface {
  name = "Project1602352928395"

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE
        "refreshToken"
      DROP CONSTRAINT
        "FK_8e913e288156c133999341156ad"
    `);

    await queryRunner.query(`
      CREATE TYPE "project_phase_enum" AS ENUM(
        'Initial', 'Closing', 'Planning', 
        'Implementation'
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "project" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
        "name" character varying(128) NOT NULL, 
        "description" character varying NOT NULL, 
        "previewUrl" character varying NOT NULL, 
        "phase" "project_phase_enum" NOT NULL DEFAULT 'Initial', 
        "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, 
        "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), 
        "deletedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), 
        "organizationId" uuid, 
        CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "projectTeamMember" (
        "projectId" uuid NOT NULL, 
        "userId" uuid NOT NULL, 
        CONSTRAINT "PK_492a5507bd7feab7d2cdf9b6642" PRIMARY KEY ("projectId", "userId")
      )
    `);

    await queryRunner.query(`
      CREATE
        INDEX "IDX_59ef36db4b369025245ddad5ec"
      ON 
        "projectTeamMember" ("projectId")
    `);

    await queryRunner.query(`
      CREATE
        INDEX "IDX_86199305e63982f68f81a24de8"
      ON
        "projectTeamMember" ("userId")
    `);

    await queryRunner.query(`
      ALTER TABLE 
        "refreshToken" 
      ADD 
        CONSTRAINT "FK_7008a2b0fb083127f60b5f4448e" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION
    `);

    await queryRunner.query(`
      ALTER TABLE 
        "project" 
      ADD 
        CONSTRAINT "FK_0028dfadf312a1d7f51656c4a9a" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE NO ACTION
    `);

    await queryRunner.query(`
      ALTER TABLE 
        "projectTeamMember" 
      ADD 
        CONSTRAINT "FK_59ef36db4b369025245ddad5ecc" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE NO ACTION
    `);

    await queryRunner.query(`
      ALTER TABLE 
        "projectTeamMember" 
      ADD 
        CONSTRAINT "FK_86199305e63982f68f81a24de85" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER
        TABLE "projectTeamMember"
      DROP
        CONSTRAINT "FK_86199305e63982f68f81a24de85"
    `);

    await queryRunner.query(`
      ALTER
        TABLE "projectTeamMember"
      DROP
        CONSTRAINT "FK_59ef36db4b369025245ddad5ecc"
    `);

    await queryRunner.query(`
      ALTER
        TABLE "project"
      DROP
        CONSTRAINT "FK_0028dfadf312a1d7f51656c4a9a"
    `);

    await queryRunner.query(`
      ALTER
        TABLE "refreshToken"
      DROP
        CONSTRAINT "FK_7008a2b0fb083127f60b5f4448e"
      `);

    await queryRunner.query("DROP INDEX \"IDX_86199305e63982f68f81a24de8\"");
    await queryRunner.query("DROP INDEX \"IDX_59ef36db4b369025245ddad5ec\"");
    await queryRunner.query("DROP TABLE \"projectTeamMember\"");
    await queryRunner.query("DROP TABLE \"project\"");
    await queryRunner.query("DROP TYPE \"project_phase_enum\"");

    await queryRunner.query(`
      ALTER TABLE 
        "refreshToken" 
      ADD 
        CONSTRAINT "FK_8e913e288156c133999341156ad" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION
    `);
  }
}
