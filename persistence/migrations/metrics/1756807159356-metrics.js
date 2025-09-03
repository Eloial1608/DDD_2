const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Metrics1756807159356 {
    name = 'Metrics1756807159356'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "uniquedailylogin" ("id" character varying NOT NULL, "userId" boolean NOT NULL, "communityId" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL, CONSTRAINT "PK_2abf56efd5b958e0204525f7100" PRIMARY KEY ("id"))`);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "uniquedailylogin"`);
    }
}
