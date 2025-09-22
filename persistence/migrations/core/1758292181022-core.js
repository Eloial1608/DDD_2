const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Core1758292181022 {
    name = 'Core1758292181022'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user_level" ADD "levelId" character varying NOT NULL`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user_level" DROP COLUMN "levelId"`);
    }
}
