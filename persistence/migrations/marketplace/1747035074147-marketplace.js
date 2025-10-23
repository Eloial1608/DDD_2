const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Marketplace1747035074147 {
    name = 'Marketplace1747035074147'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "product" ("id" character varying NOT NULL, "communityId" character varying NOT NULL, "userId" character varying NOT NULL, "spaceId" character varying NOT NULL, "title" character varying NOT NULL, "content" character varying NOT NULL, "bannerUrl" character varying, "productMedia" character varying NOT NULL, "type" character varying NOT NULL, "stock" integer, "totalRatings" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "priceValue" integer, "priceCurrency" character varying, "authorId" character varying NOT NULL, "authorMainid" character varying NOT NULL, "authorName" character varying NOT NULL, "authorUsername" character varying NOT NULL, "authorPictureurl" character varying, "authorBannerurl" character varying, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_PRODUCT_COMMUNITY_ID" ON "product" ("communityId") `);
        await queryRunner.query(`CREATE INDEX "IDX_PRODUCT_USER_ID" ON "product" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_PRODUCT_SPACE_ID" ON "product" ("spaceId") `);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX "public"."IDX_PRODUCT_SPACE_ID"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_PRODUCT_USER_ID"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_PRODUCT_COMMUNITY_ID"`);
        await queryRunner.query(`DROP TABLE "product"`);
    }
}
