const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Core1733827578962 {
    name = 'Core1733827578962'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "space" ADD "communityId" character varying NOT NULL`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "space" DROP COLUMN "communityId"`);
    }
}
