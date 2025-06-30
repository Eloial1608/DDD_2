const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Projects1751020651781 {
    name = 'Projects1751020651781'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "type" ("id" character varying NOT NULL, "title" character varying NOT NULL, "description" character varying, "color" character varying NOT NULL, "projectId" character varying, "communityId" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL, "updatedAt" TIMESTAMP NOT NULL, "deletedAt" TIMESTAMP, CONSTRAINT "PK_40410d6bf0bedb43f9cadae6fef" PRIMARY KEY ("id"))`);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "type"`);
    }
}
