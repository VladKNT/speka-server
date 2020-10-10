import { MigrationInterface, QueryRunner } from "typeorm";

export class UserDetails1602318815290 implements MigrationInterface {
  name = "UserDetails1602318815290"

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "user_details" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
        "firstName" character varying NOT NULL, 
        "lastName" character varying NOT NULL, 
        "avatarUrl" character varying NOT NULL, 
        "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, 
        "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), 
        "deletedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), 
        CONSTRAINT "PK_fb08394d3f499b9e441cab9ca51" PRIMARY KEY ("id")
        )
    `);

    await queryRunner.query(`
      ALTER TABLE 
        "user" 
      ADD 
        "userDetailsId" uuid
    `);

    await queryRunner.query(`
      ALTER TABLE 
        "user" 
      ADD 
        CONSTRAINT "UQ_51dabb934475afa077f62c116c0" UNIQUE ("userDetailsId")
    `);

    await queryRunner.query(`
      ALTER TABLE 
        "user" 
      ADD 
        CONSTRAINT "FK_51dabb934475afa077f62c116c0" FOREIGN KEY ("userDetailsId") REFERENCES "user_details"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE
        "user"
      DROP 
        CONSTRAINT "FK_51dabb934475afa077f62c116c0"
    `);

    await queryRunner.query(`
      ALTER TABLE 
        "user"
      DROP
        CONSTRAINT "UQ_51dabb934475afa077f62c116c0"
    `);

    await queryRunner.query(`
      ALTER TABLE
        "user"
      DROP 
        COLUMN "userDetailsId"`);

    await queryRunner.query("DROP TABLE \"user_details\"");
  }

}
