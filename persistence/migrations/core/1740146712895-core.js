const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Core1740146712895 {
    name = 'Core1740146712895'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "stripe_product" ALTER COLUMN "renovationInterval" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "stripe_product" ALTER COLUMN "renovationType" DROP NOT NULL`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "stripe_product" ALTER COLUMN "renovationType" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "stripe_product" ALTER COLUMN "renovationInterval" SET NOT NULL`);
    }
}
