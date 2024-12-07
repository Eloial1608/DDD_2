const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Core1733580888431 {
    name = 'Core1733580888431'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" ADD "isAdmin" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "isOwner" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "community" ADD "methodId" character varying`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "community" DROP COLUMN "methodId"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isOwner"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isAdmin"`);
    }
}
