/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 * @typedef {import('typeorm').QueryRunner} QueryRunner
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class Core1777801824511 {
    name = 'Core1777801824511'

    /**
     * @param {QueryRunner} queryRunner
     */
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "reference"`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "fromCardId" character varying`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "toCardId" character varying`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "toPhoneNumber" character varying`);
        await queryRunner.query(`ALTER TABLE "transactions" ALTER COLUMN "createdAt" DROP DEFAULT`);
    }

    /**
     * @param {QueryRunner} queryRunner
     */
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "transactions" ALTER COLUMN "createdAt" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "toPhoneNumber"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "toCardId"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "fromCardId"`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "reference" character varying`);
    }
}
