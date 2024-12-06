const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Core1732461268832 {
    name = 'Core1732461268832'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "plan" ("id" character varying NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "allowedFeatures" jsonb NOT NULL, "allowedUsers" integer NOT NULL DEFAULT '1', "renovationInterval" integer NOT NULL, "renovationType" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "priceValue" integer NOT NULL, "priceCurrency" character varying NOT NULL, CONSTRAINT "PK_54a2b686aed3b637654bf7ddbb3" PRIMARY KEY ("id"))`);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "plan"`);
    }
}
