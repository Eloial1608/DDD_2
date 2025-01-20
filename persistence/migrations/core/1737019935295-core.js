const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Core1737019935295 {
    name = 'Core1737019935295'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "community" ADD "subcommunitiesCount" integer NOT NULL DEFAULT '0'`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "community" DROP COLUMN "subcommunitiesCount"`);
    }
}
