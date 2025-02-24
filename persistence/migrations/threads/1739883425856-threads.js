const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Threads1739883425856 {
    name = 'Threads1739883425856'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "space" ("id" character varying NOT NULL, "communityId" character varying NOT NULL, "configuration" character varying NOT NULL, "accessibility" character varying NOT NULL, "type" character varying NOT NULL, CONSTRAINT "PK_094f5ec727fe052956a11623640" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_SPACE_COMMUNITY_ID" ON "space" ("communityId") `);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX "public"."IDX_SPACE_COMMUNITY_ID"`);
        await queryRunner.query(`DROP TABLE "space"`);
    }
}
