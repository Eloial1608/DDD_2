const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Core1739103574623 {
    name = 'Core1739103574623'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "community" ALTER COLUMN "suffix" DROP NOT NULL`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "community" ALTER COLUMN "suffix" SET NOT NULL`);
    }
}
