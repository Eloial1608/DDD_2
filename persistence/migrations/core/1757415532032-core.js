const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Core1757415532032 {
    name = 'Core1757415532032'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "communityconfiguration" ("id" character varying NOT NULL, "communityId" character varying, "currentTheme" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_4c6fa095b07155419fa176cfe0f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_COMMUNITYCONFIGURATION_COMMUNITY_ID" ON "communityconfiguration" ("communityId") `);
        await queryRunner.query(`ALTER TABLE "theme" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "theme" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "theme" ADD "deletedAt" TIMESTAMP`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "theme" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "theme" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "theme" DROP COLUMN "createdAt"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_COMMUNITYCONFIGURATION_COMMUNITY_ID"`);
        await queryRunner.query(`DROP TABLE "communityconfiguration"`);
    }
}
