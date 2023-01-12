import { MigrationInterface, QueryRunner } from 'typeorm';

export class AthletesEventsRelation1673455970838 implements MigrationInterface {
  name = 'AthletesEventsRelation1673455970838';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "events_athletes_users" ("eventsId" uuid NOT NULL, "usersId" uuid NOT NULL, CONSTRAINT "PK_5b1752b4380e9d8ecab5a0e7145" PRIMARY KEY ("eventsId", "usersId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b1ff892407667bb2150ee224dc" ON "events_athletes_users" ("eventsId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_1aafe2d1ed7a0ee41f126ae4b8" ON "events_athletes_users" ("usersId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "events_athletes_users" ADD CONSTRAINT "FK_b1ff892407667bb2150ee224dcc" FOREIGN KEY ("eventsId") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "events_athletes_users" ADD CONSTRAINT "FK_1aafe2d1ed7a0ee41f126ae4b86" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "events_athletes_users" DROP CONSTRAINT "FK_1aafe2d1ed7a0ee41f126ae4b86"`,
    );
    await queryRunner.query(
      `ALTER TABLE "events_athletes_users" DROP CONSTRAINT "FK_b1ff892407667bb2150ee224dcc"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_1aafe2d1ed7a0ee41f126ae4b8"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_b1ff892407667bb2150ee224dc"`,
    );
    await queryRunner.query(`DROP TABLE "events_athletes_users"`);
  }
}
