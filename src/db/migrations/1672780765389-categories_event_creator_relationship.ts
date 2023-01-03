import { MigrationInterface, QueryRunner } from 'typeorm';

export class categoriesEventCreatorRelationship1672780765389
  implements MigrationInterface
{
  name = 'categoriesEventCreatorRelationship1672780765389';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "events_categories_categories" ("eventsId" uuid NOT NULL, "categoriesId" uuid NOT NULL, CONSTRAINT "PK_cbafb88d0a713682a8354e21124" PRIMARY KEY ("eventsId", "categoriesId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_8ec1afd5bf48b617b478e86ea6" ON "events_categories_categories" ("eventsId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_91500cdda8bef78e27a5fc795f" ON "events_categories_categories" ("categoriesId") `,
    );
    await queryRunner.query(`ALTER TABLE "events" ADD "createdById" uuid`);
    await queryRunner.query(
      `ALTER TABLE "events" ADD CONSTRAINT "FK_2fb864f37ad210f4295a09b684d" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "events_categories_categories" ADD CONSTRAINT "FK_8ec1afd5bf48b617b478e86ea60" FOREIGN KEY ("eventsId") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "events_categories_categories" ADD CONSTRAINT "FK_91500cdda8bef78e27a5fc795f8" FOREIGN KEY ("categoriesId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "events_categories_categories" DROP CONSTRAINT "FK_91500cdda8bef78e27a5fc795f8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "events_categories_categories" DROP CONSTRAINT "FK_8ec1afd5bf48b617b478e86ea60"`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" DROP CONSTRAINT "FK_2fb864f37ad210f4295a09b684d"`,
    );
    await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "createdById"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_91500cdda8bef78e27a5fc795f"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_8ec1afd5bf48b617b478e86ea6"`,
    );
    await queryRunner.query(`DROP TABLE "events_categories_categories"`);
    await queryRunner.query(`DROP TABLE "categories"`);
  }
}
