import {MigrationInterface, QueryRunner} from "typeorm";

export class OrganizatioProjectCascade1604905219430 implements MigrationInterface {
    name = "OrganizatioProjectCascade1604905219430"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE \"project\" DROP CONSTRAINT \"FK_0028dfadf312a1d7f51656c4a9a\"");
        await queryRunner.query("ALTER TABLE \"componentDetails\" DROP CONSTRAINT \"FK_5426723d24f3e7a73e99e3e731c\"");
        await queryRunner.query("ALTER TABLE \"project\" ADD CONSTRAINT \"FK_0028dfadf312a1d7f51656c4a9a\" FOREIGN KEY (\"organizationId\") REFERENCES \"organization\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"componentDetails\" ADD CONSTRAINT \"FK_5426723d24f3e7a73e99e3e731c\" FOREIGN KEY (\"componentId\") REFERENCES \"component\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE \"componentDetails\" DROP CONSTRAINT \"FK_5426723d24f3e7a73e99e3e731c\"");
        await queryRunner.query("ALTER TABLE \"project\" DROP CONSTRAINT \"FK_0028dfadf312a1d7f51656c4a9a\"");
        await queryRunner.query("ALTER TABLE \"componentDetails\" ADD CONSTRAINT \"FK_5426723d24f3e7a73e99e3e731c\" FOREIGN KEY (\"componentId\") REFERENCES \"component\"(\"id\") ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE \"project\" ADD CONSTRAINT \"FK_0028dfadf312a1d7f51656c4a9a\" FOREIGN KEY (\"organizationId\") REFERENCES \"organization\"(\"id\") ON DELETE CASCADE ON UPDATE NO ACTION");
    }

}
