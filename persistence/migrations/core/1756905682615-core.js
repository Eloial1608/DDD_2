const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Core1756905682615 {
    name = 'Core1756905682615'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "community" ADD "onboardingStep" character varying NOT NULL DEFAULT 'profile'`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "community" DROP COLUMN "onboardingStep"`);
    }
}
