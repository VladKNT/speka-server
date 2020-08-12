import { MigrationInterface, QueryRunner } from "typeorm";

export class Organization1597230801002 implements MigrationInterface {
  name = "Organization1597230801002"

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "organization" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
        "name" character varying(128) NOT NULL, 
        "email" character varying NOT NULL, 
        "contactNumber" character varying NOT NULL, 
        "logoUrl" character varying, 
        "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, 
        "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), 
        "deletedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), 
        CONSTRAINT "PK_472c1f99a32def1b0abb219cd67" PRIMARY KEY ("id")
      )
    `);
  }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE \"organization\"");
    }
}
