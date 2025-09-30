const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Core1759228126238 {
    name = 'Core1759228126238'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "community" ALTER COLUMN "allowsTitles" SET DEFAULT false`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "community" ALTER COLUMN "allowsTitles" SET DEFAULT true`);
    }
}
