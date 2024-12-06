const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Core1733479280921 {
    name = 'Core1733479280921'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "account" ("id" character varying NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL, "methodId" character varying NOT NULL, CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "account"`);
    }
}
