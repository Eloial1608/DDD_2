const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Core1758103666808 {
    name = 'Core1758103666808'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "user_title" ("id" character varying NOT NULL, "communityId" character varying NOT NULL, "titleId" character varying NOT NULL, "userId" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_8ce1e7685e9186d6cf8021903eb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_USER_TITLE_COMMUNITY_ID" ON "user_title" ("communityId") `);
        await queryRunner.query(`CREATE INDEX "IDX_USER_TITLE_USER_ID" ON "user_title" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_USER_TITLE_TITLE_ID" ON "user_title" ("titleId") `);
        await queryRunner.query(`CREATE TABLE "level" ("id" character varying NOT NULL, "communityId" character varying NOT NULL, "levelNumber" integer NOT NULL, "minimumExp" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d3f1a7a6f09f1c3144bacdc6bcc" PRIMARY KEY ("id"))`);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "level"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_USER_TITLE_TITLE_ID"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_USER_TITLE_USER_ID"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_USER_TITLE_COMMUNITY_ID"`);
        await queryRunner.query(`DROP TABLE "user_title"`);
    }
}
