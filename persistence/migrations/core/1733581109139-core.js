const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Core1733581109139 {
    name = 'Core1733581109139'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "community_plan" ("id" character varying NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "allowedFeatures" jsonb NOT NULL, "allowedUsers" integer NOT NULL DEFAULT '1', "renovationInterval" integer NOT NULL, "renovationType" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "priceValue" integer NOT NULL, "priceCurrency" character varying NOT NULL, CONSTRAINT "PK_f9eb780a8ba05e9da4ae4614834" PRIMARY KEY ("id"))`);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "community_plan"`);
    }
}
