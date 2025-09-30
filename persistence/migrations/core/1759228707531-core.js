const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Core1759228707531 {
    name = 'Core1759228707531'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "community" ADD "allowsTitles" boolean NOT NULL DEFAULT false`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "community" DROP COLUMN "allowsTitles"`);
    }
}
