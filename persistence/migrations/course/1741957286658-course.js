const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Course1741957286658 {
    name = 'Course1741957286658'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "comment" ("id" character varying NOT NULL, "courseId" character varying NOT NULL, "userId" character varying NOT NULL, "content" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL, "updatedAt" TIMESTAMP NOT NULL, "authorId" character varying NOT NULL, "authorMainid" character varying NOT NULL, "authorName" character varying NOT NULL, "authorUsername" character varying NOT NULL, "authorPictureurl" character varying, "authorBannerurl" character varying, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_COMMENT_COURSE_ID" ON "comment" ("courseId") `);
        await queryRunner.query(`CREATE INDEX "IDX_COMMENT_USER_ID" ON "comment" ("userId") `);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX "public"."IDX_COMMENT_USER_ID"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_COMMENT_COURSE_ID"`);
        await queryRunner.query(`DROP TABLE "comment"`);
    }
}
