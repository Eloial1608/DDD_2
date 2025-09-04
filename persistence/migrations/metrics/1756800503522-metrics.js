const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Metrics1756800503522 {
    name = 'Metrics1756800503522'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "createdentity" ("id" character varying NOT NULL, "communityId" character varying NOT NULL, "totalPost" integer NOT NULL, "totalMedia" integer NOT NULL, "totalThread" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL, CONSTRAINT "PK_e25473088171e1fb52fdf751f61" PRIMARY KEY ("id"))`);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "createdentity"`);
    }
}
