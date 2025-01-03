const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Posts1735894524406 {
    name = 'Posts1735894524406'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "post_user" ("id" character varying NOT NULL, "userId" character varying NOT NULL, "postId" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_52378a74ae3724bcab44036645b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_POST_USER_USER_ID" ON "post_user" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_POST_USER_POST_ID" ON "post_user" ("postId") `);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX "public"."IDX_POST_USER_POST_ID"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_POST_USER_USER_ID"`);
        await queryRunner.query(`DROP TABLE "post_user"`);
    }
}
