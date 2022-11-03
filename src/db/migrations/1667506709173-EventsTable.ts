import { MigrationInterface, QueryRunner } from 'typeorm';

export class EventsTable1667506709173 implements MigrationInterface {
  name = 'EventsTable1667506709173';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "events" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "price" integer NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_40731c7151fe4be3116e45ddf73" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_dfa3d03bef3f90f650fd138fb3" ON "events" ("name") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_dfa3d03bef3f90f650fd138fb3"`,
    );
    await queryRunner.query(`DROP TABLE "events"`);
  }
}
