const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Course1736855494887 {
    name = 'Course1736855494887'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "course" ("id" character varying NOT NULL, "communityId" character varying NOT NULL, "spaceId" character varying NOT NULL, "title" character varying NOT NULL, "userId" character varying NOT NULL, "startDate" TIMESTAMP NOT NULL, "endDate" TIMESTAMP NOT NULL, "bannerUrl" character varying NOT NULL, "isPaid" boolean NOT NULL, "totalStudents" integer NOT NULL, "totalComments" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL, "updatedAt" TIMESTAMP NOT NULL, "deletedAt" TIMESTAMP NOT NULL, "authorId" character varying NOT NULL, "authorMainid" character varying NOT NULL, "authorName" character varying NOT NULL, "authorUsername" character varying NOT NULL, "authorPictureurl" character varying, "authorBannerurl" character varying, "priceValue" integer, "priceCurrency" character varying, CONSTRAINT "PK_bf95180dd756fd204fb01ce4916" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_COURSE_COMMUNITY_ID" ON "course" ("communityId") `);
        await queryRunner.query(`CREATE INDEX "IDX_COURSE_SPACE_ID" ON "course" ("spaceId") `);
        await queryRunner.query(`CREATE INDEX "IDX_COURSE_USER_ID" ON "course" ("userId") `);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX "public"."IDX_COURSE_USER_ID"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_COURSE_SPACE_ID"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_COURSE_COMMUNITY_ID"`);
        await queryRunner.query(`DROP TABLE "course"`);
    }
}
