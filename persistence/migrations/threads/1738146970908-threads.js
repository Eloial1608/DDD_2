const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Threads1738146970908 {
    name = 'Threads1738146970908'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "community" ("id" character varying NOT NULL, "isPrivate" boolean NOT NULL, CONSTRAINT "PK_cae794115a383328e8923de4193" PRIMARY KEY ("id"))`);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "community"`);
    }
}
