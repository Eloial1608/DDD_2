const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Posts1735488896831 {
    name = 'Posts1735488896831'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "community" ("id" character varying NOT NULL, "isPrivate" boolean NOT NULL, CONSTRAINT "PK_cae794115a383328e8923de4193" PRIMARY KEY ("id"))`);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "community"`);
    }
}
