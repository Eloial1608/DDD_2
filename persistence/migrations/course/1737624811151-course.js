const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Course1737624811151 {
    name = 'Course1737624811151'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "space_member" ("id" character varying NOT NULL, "spaceId" character varying NOT NULL, "userId" character varying NOT NULL, "isModerator" boolean NOT NULL, CONSTRAINT "PK_11ebe76f334b83775730cb38f7e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_SPACE_MEMBER_SPACE_ID" ON "space_member" ("spaceId") `);
        await queryRunner.query(`CREATE INDEX "IDX_SPACE_MEMBER_USER_ID" ON "space_member" ("userId") `);
        await queryRunner.query(`CREATE TABLE "section" ("id" character varying NOT NULL, "courseId" character varying NOT NULL, "title" character varying NOT NULL, "totalLessons" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL, "updatedAt" TIMESTAMP NOT NULL, "deletedAt" TIMESTAMP NOT NULL, CONSTRAINT "PK_3c41d2d699384cc5e8eac54777d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_SECTION_COURSE_ID" ON "section" ("courseId") `);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX "public"."IDX_SECTION_COURSE_ID"`);
        await queryRunner.query(`DROP TABLE "section"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_SPACE_MEMBER_USER_ID"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_SPACE_MEMBER_SPACE_ID"`);
        await queryRunner.query(`DROP TABLE "space_member"`);
    }
}
