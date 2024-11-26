const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Core1732628102738 {
    name = 'Core1732628102738'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "community" DROP COLUMN "planId"`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "community" ADD "planId" character varying NOT NULL`);
    }
}
