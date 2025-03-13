const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Media1741782581759 {
    name = 'Media1741782581759'

    async up(queryRunner) {
        await queryRunner.query(`DROP INDEX "public"."IDX_LIKE_POST_ID"`);
        await queryRunner.query(`ALTER TABLE "like" RENAME COLUMN "postId" TO "mediaId"`);
        await queryRunner.query(`CREATE INDEX "IDX_LIKE_MEDIA_ID" ON "like" ("mediaId") `);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX "public"."IDX_LIKE_MEDIA_ID"`);
        await queryRunner.query(`ALTER TABLE "like" RENAME COLUMN "mediaId" TO "postId"`);
        await queryRunner.query(`CREATE INDEX "IDX_LIKE_POST_ID" ON "like" ("postId") `);
    }
}
