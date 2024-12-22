const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Core1734804750643 {
    name = 'Core1734804750643'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user_plan" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "stripe_session" ADD "productName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "stripe_session" ALTER COLUMN "productRenovationinterval" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "stripe_session" ALTER COLUMN "productRenovationtype" DROP NOT NULL`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "stripe_session" ALTER COLUMN "productRenovationtype" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "stripe_session" ALTER COLUMN "productRenovationinterval" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "stripe_session" DROP COLUMN "productName"`);
        await queryRunner.query(`ALTER TABLE "user_plan" ADD "description" character varying NOT NULL`);
    }
}
