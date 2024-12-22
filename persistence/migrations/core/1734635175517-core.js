const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Core1734635175517 {
    name = 'Core1734635175517'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "stripe_account" ("id" character varying NOT NULL, "apiKey" character varying NOT NULL, CONSTRAINT "PK_10261d6ff07aa346d984a0c853d" PRIMARY KEY ("id"))`);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "stripe_account"`);
    }
}
