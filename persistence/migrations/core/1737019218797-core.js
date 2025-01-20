const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Core1737019218797 {
    name = 'Core1737019218797'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "community" ADD "allowedSubcommunities" integer NOT NULL DEFAULT '0'`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "community" DROP COLUMN "allowedSubcommunities"`);
    }
}
