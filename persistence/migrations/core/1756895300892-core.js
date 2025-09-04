const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Core1756895300892 {
    name = 'Core1756895300892'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "space_user_title" ("id" character varying NOT NULL, "communityId" character varying NOT NULL, "titleId" character varying NOT NULL, "userId" character varying NOT NULL, "spaceId" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d79027c79ad1d9b0a5cbf02e3c6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_SPACE_USER_TITLE_COMMUNITY_ID" ON "space_user_title" ("communityId") `);
        await queryRunner.query(`CREATE INDEX "IDX_SPACE_USER_TITLE_USER_ID" ON "space_user_title" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_SPACE_USER_TITLE_TITLE_ID" ON "space_user_title" ("titleId") `);
        await queryRunner.query(`ALTER TABLE "title" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "title" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "title" ADD "deletedAt" TIMESTAMP`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "title" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "title" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "title" DROP COLUMN "createdAt"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_SPACE_USER_TITLE_TITLE_ID"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_SPACE_USER_TITLE_USER_ID"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_SPACE_USER_TITLE_COMMUNITY_ID"`);
        await queryRunner.query(`DROP TABLE "space_user_title"`);
    }
}
