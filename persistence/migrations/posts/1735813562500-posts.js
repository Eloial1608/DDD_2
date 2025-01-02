const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Posts1735813562500 {
    name = 'Posts1735813562500'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "post" ("id" character varying NOT NULL, "communityId" character varying NOT NULL, "userId" character varying NOT NULL, "title" character varying NOT NULL, "content" character varying NOT NULL, "bannerUrl" character varying, "isPaid" boolean NOT NULL, "totalLikes" integer NOT NULL, "totalComments" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "priceValue" integer, "priceCurrency" character varying, "authorId" character varying NOT NULL, "authorMainid" character varying NOT NULL, "authorName" character varying NOT NULL, "authorUsername" character varying NOT NULL, "authorPictureurl" character varying, "authorBannerurl" character varying, CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_POST_COMMUNITY_ID" ON "post" ("communityId") `);
        await queryRunner.query(`CREATE INDEX "IDX_POST_USER_ID" ON "post" ("userId") `);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX "public"."IDX_POST_USER_ID"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_POST_COMMUNITY_ID"`);
        await queryRunner.query(`DROP TABLE "post"`);
    }
}
