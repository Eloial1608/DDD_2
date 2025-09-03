const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Metrics1756799306809 {
    name = 'Metrics1756799306809'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "userretention" ("id" character varying NOT NULL, "userId" boolean NOT NULL, "communityId" character varying NOT NULL, "startDate" TIMESTAMP NOT NULL, "endDate" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL, CONSTRAINT "PK_770a58180d0feec8897e0647731" PRIMARY KEY ("id"))`);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "userretention"`);
    }
}
