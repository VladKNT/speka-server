import { MigrationInterface, QueryRunner } from "typeorm";

export class User1597387838421 implements MigrationInterface {
  name = "User1597387838421"

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "user" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
        "email" character varying NOT NULL, 
        "contactNumber" character varying NOT NULL, 
        "password" character varying NOT NULL, 
        "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, 
        "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), 
        "deletedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), 
        "organizationId" uuid, 
        CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      ALTER TABLE 
        "user" 
      ADD 
        CONSTRAINT "FK_dfda472c0af7812401e592b6a61" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
  }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
        ALTER TABLE 
          "user" 
        DROP 
          CONSTRAINT "FK_dfda472c0af7812401e592b6a61"
      `);

      await queryRunner.query("DROP TABLE \"user\"");
    }
}
