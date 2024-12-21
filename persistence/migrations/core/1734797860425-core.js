const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Core1734797860425 {
    name = 'Core1734797860425'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "community_plan" ADD "isActive" boolean NOT NULL`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "community_plan" DROP COLUMN "isActive"`);
    }
}
