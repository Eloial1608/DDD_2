const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Metrics1756801365544 {
    name = 'Metrics1756801365544'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "session" ("id" character varying NOT NULL, "userId" boolean NOT NULL, "communityId" character varying NOT NULL, "country" character varying NOT NULL, "city" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL, CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY ("id"))`);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "session"`);
    }
}
