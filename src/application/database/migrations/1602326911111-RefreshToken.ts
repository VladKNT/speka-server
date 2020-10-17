import { MigrationInterface, QueryRunner } from "typeorm";

export class RefreshToken1602326911111 implements MigrationInterface {
  name = "RefreshToken1602326911111"

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "refreshToken" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "token" character varying NOT NULL, 
        "fingerprint" character varying(128) NOT NULL, 
        "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, 
        "userId" uuid, 
        CONSTRAINT "UQ_c31d0a2f38e6e99110df62ab0af" UNIQUE ("token"), 
        CONSTRAINT "PK_b575dd3c21fb0831013c909e7fe" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      ALTER TABLE 
        "refreshToken" 
      ADD 
        CONSTRAINT "FK_8e913e288156c133999341156ad" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE
        "refreshToken"
      DROP
        CONSTRAINT "FK_8e913e288156c133999341156ad"
    `);

    await queryRunner.query("DROP TABLE \"refreshToken\"");
  }
}
