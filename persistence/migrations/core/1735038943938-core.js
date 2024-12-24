const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Core1735038943938 {
    name = 'Core1735038943938'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "space" ADD "configuration" character varying NOT NULL`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "space" DROP COLUMN "configuration"`);
    }
}
