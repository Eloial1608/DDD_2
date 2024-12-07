const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Core1733574040847 {
    name = 'Core1733574040847'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "registerData" DROP NOT NULL`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "registerData" SET NOT NULL`);
    }
}
