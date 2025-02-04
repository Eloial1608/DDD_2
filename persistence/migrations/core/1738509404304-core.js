const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Core1738509404304 {
    name = 'Core1738509404304'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "form" ADD "createdBy" character varying NOT NULL`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "form" DROP COLUMN "createdBy"`);
    }
}
