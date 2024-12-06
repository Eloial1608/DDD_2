const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Core1733479504120 {
    name = 'Core1733479504120'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "account" ALTER COLUMN "methodId" DROP NOT NULL`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "account" ALTER COLUMN "methodId" SET NOT NULL`);
    }
}
