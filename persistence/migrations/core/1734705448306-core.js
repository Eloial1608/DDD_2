const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Core1734705448306 {
    name = 'Core1734705448306'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "stripe_session" ("id" character varying NOT NULL, "stripeId" character varying NOT NULL, "url" character varying NOT NULL, "accountId" character varying NOT NULL, "price" character varying NOT NULL, "completed" boolean NOT NULL, "successUrl" character varying NOT NULL, "failUrl" character varying NOT NULL, "productId" character varying NOT NULL, "productType" character varying NOT NULL, "productPriceid" character varying NOT NULL, "productRenovationinterval" integer NOT NULL, "productRenovationtype" character varying NOT NULL, CONSTRAINT "UQ_6752e6c228c16c5a0fad2b1b8ce" UNIQUE ("stripeId"), CONSTRAINT "PK_864b4ad1c7494cfe48d8231956f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "stripe_product" ADD "priceId" character varying NOT NULL`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "stripe_product" DROP COLUMN "priceId"`);
        await queryRunner.query(`DROP TABLE "stripe_session"`);
    }
}
