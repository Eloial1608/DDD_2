const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Course1741779300519 {
    name = 'Course1741779300519'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "course_user" ("id" character varying NOT NULL, "userId" character varying NOT NULL, "courseId" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_bb2c8374d6f04bf9301895d1b33" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_COURSE_USER_USER_ID" ON "course_user" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_COURSE_USER_COURSE_ID" ON "course_user" ("courseId") `);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX "public"."IDX_COURSE_USER_COURSE_ID"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_COURSE_USER_USER_ID"`);
        await queryRunner.query(`DROP TABLE "course_user"`);
    }
}
