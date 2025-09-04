const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Metrics1756715396346 {
    name = 'Metrics1756715396346'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "newuser" ("id" character varying NOT NULL, "userId" boolean NOT NULL, "communityId" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL, CONSTRAINT "PK_1a1d1a71ef8c8c90287a40060df" PRIMARY KEY ("id"))`);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "newuser"`);
    }
}
