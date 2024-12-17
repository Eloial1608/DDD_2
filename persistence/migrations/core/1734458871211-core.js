const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Core1734458871211 {
    name = 'Core1734458871211'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "community" ALTER COLUMN "homeSpaceId" DROP NOT NULL`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "community" ALTER COLUMN "homeSpaceId" SET NOT NULL`);
    }
}
