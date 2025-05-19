const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Marketplace1747295408072 {
    name = 'Marketplace1747295408072'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "review" ("id" character varying NOT NULL, "productId" character varying NOT NULL, "content" character varying, "rating" integer NOT NULL, "userId" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL, "authorId" character varying NOT NULL, "authorMainid" character varying NOT NULL, "authorName" character varying NOT NULL, "authorUsername" character varying NOT NULL, "authorPictureurl" character varying, "authorBannerurl" character varying, CONSTRAINT "PK_2e4299a343a81574217255c00ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_MARKETPLACE_USER_ID" ON "review" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_MARKETPLACE_PRODUCT_ID" ON "review" ("productId") `);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX "public"."IDX_MARKETPLACE_PRODUCT_ID"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_MARKETPLACE_USER_ID"`);
        await queryRunner.query(`DROP TABLE "review"`);
    }
}
