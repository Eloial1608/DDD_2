const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Core1756469079845 {
    name = 'Core1756469079845'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "title" ("id" character varying NOT NULL, "name" character varying NOT NULL, "communityId" character varying NOT NULL, "titleImageUrl" character varying NOT NULL, CONSTRAINT "PK_30e6ea2dcc2aae4a4d1f5d9e183" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_TITLE_NAME" ON "title" ("name") `);
        await queryRunner.query(`CREATE INDEX "IDX_TITLE_COMMUNITY_ID" ON "title" ("communityId") `);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX "public"."IDX_TITLE_COMMUNITY_ID"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_TITLE_NAME"`);
        await queryRunner.query(`DROP TABLE "title"`);
    }
}
