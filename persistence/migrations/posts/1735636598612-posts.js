const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Posts1735636598612 {
    name = 'Posts1735636598612'

    async up(queryRunner) {
        await queryRunner.query(`CREATE INDEX "IDX_LIKE_USER_ID" ON "like" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_LIKE_POST_ID" ON "like" ("postId") `);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX "public"."IDX_LIKE_POST_ID"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_LIKE_USER_ID"`);
    }
}
