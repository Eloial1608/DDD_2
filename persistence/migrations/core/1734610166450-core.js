const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Core1734610166450 {
    name = 'Core1734610166450'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "user_plan" ("id" character varying NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "planId" character varying NOT NULL, "userId" character varying NOT NULL, "renovationInterval" integer NOT NULL, "renovationType" character varying NOT NULL, "expiresAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "priceValue" integer NOT NULL, "priceCurrency" character varying NOT NULL, CONSTRAINT "PK_aa22a94c276c9921fe6590c1557" PRIMARY KEY ("id"))`);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "user_plan"`);
    }
}
