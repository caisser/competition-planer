import { MigrationInterface, QueryRunner } from 'typeorm';

export class refreshTokenForUsers1675434432166 implements MigrationInterface {
  name = 'refreshTokenForUsers1675434432166';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "currentHashedRefreshToken" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP COLUMN "currentHashedRefreshToken"`,
    );
  }
}
