const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Core1760021791007 {
    name = 'Core1760021791007'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" ADD "principalTitle" character varying`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "principalTitle"`);
    }
}
