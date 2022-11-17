import { MigrationInterface, QueryRunner } from 'typeorm';

export class EventIdToUUID1668721223284 implements MigrationInterface {
  name = 'EventIdToUUID1668721223284';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "events" DROP CONSTRAINT "PK_40731c7151fe4be3116e45ddf73"`,
    );
    await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "events" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" ADD CONSTRAINT "PK_40731c7151fe4be3116e45ddf73" PRIMARY KEY ("id")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "events" DROP CONSTRAINT "PK_40731c7151fe4be3116e45ddf73"`,
    );
    await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "events" ADD "id" SERIAL NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "events" ADD CONSTRAINT "PK_40731c7151fe4be3116e45ddf73" PRIMARY KEY ("id")`,
    );
  }
}
