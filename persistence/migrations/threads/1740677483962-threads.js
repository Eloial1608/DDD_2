const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Threads1740677483962 {
    name = 'Threads1740677483962'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "thread" ("id" character varying NOT NULL, "communityId" character varying NOT NULL, "userId" character varying NOT NULL, "spaceId" character varying NOT NULL, "title" character varying NOT NULL, "parentThreadId" character varying, "content" character varying NOT NULL, "bannerUrl" character varying, "isPaid" boolean NOT NULL, "totalLikes" integer NOT NULL, "totalThreads" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "priceValue" integer, "priceCurrency" character varying, "authorId" character varying NOT NULL, "authorMainid" character varying NOT NULL, "authorName" character varying NOT NULL, "authorUsername" character varying NOT NULL, "authorPictureurl" character varying, "authorBannerurl" character varying, CONSTRAINT "PK_cabc0f3f27d7b1c70cf64623e02" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_THREAD_COMMUNITY_ID" ON "thread" ("communityId") `);
        await queryRunner.query(`CREATE INDEX "IDX_THREAD_USER_ID" ON "thread" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_THREAD_SPACE_ID" ON "thread" ("spaceId") `);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX "public"."IDX_THREAD_SPACE_ID"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_THREAD_USER_ID"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_THREAD_COMMUNITY_ID"`);
        await queryRunner.query(`DROP TABLE "thread"`);
    }
}
