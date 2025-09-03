const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Metrics1756798091145 {
    name = 'Metrics1756798091145'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "pageview" ("id" character varying NOT NULL, "userId" boolean NOT NULL, "communityId" character varying NOT NULL, "spaceId" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL, CONSTRAINT "PK_b369354588c5ba06c25a8ff7255" PRIMARY KEY ("id"))`);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "pageview"`);
    }
}
