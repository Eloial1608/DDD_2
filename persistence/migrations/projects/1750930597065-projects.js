const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Projects1750930597065 {
    name = 'Projects1750930597065'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "project" ("id" character varying NOT NULL, "title" character varying NOT NULL, "description" character varying, "bannerUrl" character varying, "leadUserId" character varying NOT NULL, "startDate" TIMESTAMP, "endDate" TIMESTAMP, "totalTasks" integer NOT NULL, "communityId" character varying NOT NULL, "spaceId" character varying NOT NULL, "userId" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL, "updatedAt" TIMESTAMP NOT NULL, "deletedAt" TIMESTAMP, CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "project"`);
    }
}
