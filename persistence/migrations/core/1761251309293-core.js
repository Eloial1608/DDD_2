const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Core1761251309293 {
    name = 'Core1761251309293'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "_user_title" ("id" character varying NOT NULL, "communityId" character varying NOT NULL, "titleId" character varying NOT NULL, "userId" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c8bf9df3c2b17ae23194d0407a1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX__USER_TITLE_COMMUNITY_ID" ON "_user_title" ("communityId") `);
        await queryRunner.query(`CREATE INDEX "IDX__USER_TITLE_USER_ID" ON "_user_title" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX__USER_TITLE_TITLE_ID" ON "_user_title" ("titleId") `);
        await queryRunner.query(`CREATE TABLE "metric" ("id" character varying NOT NULL, "type" character varying NOT NULL, "date" TIMESTAMP NOT NULL, CONSTRAINT "PK_7d24c075ea2926dd32bd1c534ce" PRIMARY KEY ("id"))`);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "metric"`);
        await queryRunner.query(`DROP INDEX "public"."IDX__USER_TITLE_TITLE_ID"`);
        await queryRunner.query(`DROP INDEX "public"."IDX__USER_TITLE_USER_ID"`);
        await queryRunner.query(`DROP INDEX "public"."IDX__USER_TITLE_COMMUNITY_ID"`);
        await queryRunner.query(`DROP TABLE "_user_title"`);
    }
}
