const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Core1734433536815 {
    name = 'Core1734433536815'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "community" ADD "slug" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "community" ADD "parentId" character varying`);
        await queryRunner.query(`ALTER TABLE "community" ADD "mainId" character varying`);
        await queryRunner.query(`ALTER TABLE "community" ADD "logoUrl" character varying`);
        await queryRunner.query(`ALTER TABLE "community" ADD "bannerUrl" character varying`);
        await queryRunner.query(`ALTER TABLE "community" ADD "about" character varying`);
        await queryRunner.query(`CREATE INDEX "IDX_COMMUNITY_SLUG" ON "community" ("slug") `);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX "public"."IDX_COMMUNITY_SLUG"`);
        await queryRunner.query(`ALTER TABLE "community" DROP COLUMN "about"`);
        await queryRunner.query(`ALTER TABLE "community" DROP COLUMN "bannerUrl"`);
        await queryRunner.query(`ALTER TABLE "community" DROP COLUMN "logoUrl"`);
        await queryRunner.query(`ALTER TABLE "community" DROP COLUMN "mainId"`);
        await queryRunner.query(`ALTER TABLE "community" DROP COLUMN "parentId"`);
        await queryRunner.query(`ALTER TABLE "community" DROP COLUMN "slug"`);
    }
}
