const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Course1742211836517 {
    name = 'Course1742211836517'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "lesson" ("id" character varying NOT NULL, "sectionId" character varying NOT NULL, "title" character varying NOT NULL, "type" character varying NOT NULL, "content" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_0ef25918f0237e68696dee455bd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_LESSON_SECTION_ID" ON "lesson" ("sectionId") `);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX "public"."IDX_LESSON_SECTION_ID"`);
        await queryRunner.query(`DROP TABLE "lesson"`);
    }
}
