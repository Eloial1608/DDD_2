const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Core1734688988077 {
    name = 'Core1734688988077'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "stripe_product" ("id" character varying NOT NULL, "accountId" character varying NOT NULL, "productId" character varying NOT NULL, "productType" character varying NOT NULL, "price" character varying NOT NULL, "renovationInterval" integer NOT NULL, "renovationType" character varying NOT NULL, CONSTRAINT "PK_7672a4d044e9fe12015d75cc0f1" PRIMARY KEY ("id"))`);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "stripe_product"`);
    }
}
