const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Posts1735922912150 {
    name = 'Posts1735922912150'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "userMetadata"`);
        await queryRunner.query(`ALTER TABLE "comment" ADD "authorId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "comment" ADD "authorMainid" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "comment" ADD "authorName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "comment" ADD "authorUsername" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "comment" ADD "authorPictureurl" character varying`);
        await queryRunner.query(`ALTER TABLE "comment" ADD "authorBannerurl" character varying`);
        await queryRunner.query(`CREATE INDEX "IDX_COMMENT_POST_ID" ON "comment" ("postId") `);
        await queryRunner.query(`CREATE INDEX "IDX_COMMENT_USER_ID" ON "comment" ("userId") `);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX "public"."IDX_COMMENT_USER_ID"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_COMMENT_POST_ID"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "authorBannerurl"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "authorPictureurl"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "authorUsername"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "authorName"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "authorMainid"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "authorId"`);
        await queryRunner.query(`ALTER TABLE "comment" ADD "userMetadata" character varying NOT NULL`);
    }
}
