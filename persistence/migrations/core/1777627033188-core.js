/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 * @typedef {import('typeorm').QueryRunner} QueryRunner
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class Core1777627033188 {
    name = 'Core1777627033188'

    /**
     * @param {QueryRunner} queryRunner
     */
    async up(queryRunner) {
        await queryRunner.query(`CREATE TYPE "public"."user_identitydoctype_enum" AS ENUM('dni', 'cif', 'passport', 'nie')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" character varying NOT NULL, "name" character varying NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "isAdmin" boolean NOT NULL, "companyName" character varying NOT NULL, "phoneNumber" character varying NOT NULL, "birthDate" character varying NOT NULL, "address" character varying NOT NULL, "city" character varying NOT NULL, "zipcode" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "identityDocNumber" character varying, "identityDocType" "public"."user_identitydoctype_enum", CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_USER_USERNAME" ON "user" ("username") `);
        await queryRunner.query(`CREATE TABLE "transactions" ("id" character varying NOT NULL, "fromAccountId" character varying, "toAccountId" character varying, "balance" integer NOT NULL, "concept" character varying, "reference" character varying, "status" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_TRANSACTION_FROM_ACCOUNT" ON "transactions" ("fromAccountId") `);
        await queryRunner.query(`CREATE INDEX "IDX_TRANSACTION_TO_ACCOUNT" ON "transactions" ("toAccountId") `);
        await queryRunner.query(`CREATE INDEX "IDX_TRANSACTION_STATUS" ON "transactions" ("status") `);
        await queryRunner.query(`CREATE TABLE "card" ("id" character varying NOT NULL, "numCard" character varying NOT NULL, "type_Card" character varying NOT NULL, "limitCard" integer NOT NULL, "balance" integer NOT NULL, "expiration" TIMESTAMP NOT NULL, "cardPin" character varying NOT NULL, "cvv" character varying NOT NULL, "accountId" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_b705c569491e136822356298b87" UNIQUE ("numCard"), CONSTRAINT "PK_9451069b6f1199730791a7f4ae4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_CARD_ACCOUNT" ON "card" ("accountId") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_CARD_NUM" ON "card" ("numCard") `);
        await queryRunner.query(`CREATE TABLE "account" ("id" character varying NOT NULL, "iban" character varying NOT NULL, "balance" integer NOT NULL, "userId" character varying NOT NULL, "type_account" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ACCOUNT_USER" ON "account" ("userId") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_ACCOUNT_IBAN" ON "account" ("iban") `);
    }

    /**
     * @param {QueryRunner} queryRunner
     */
    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX "public"."IDX_ACCOUNT_IBAN"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ACCOUNT_USER"`);
        await queryRunner.query(`DROP TABLE "account"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_CARD_NUM"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_CARD_ACCOUNT"`);
        await queryRunner.query(`DROP TABLE "card"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_TRANSACTION_STATUS"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_TRANSACTION_TO_ACCOUNT"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_TRANSACTION_FROM_ACCOUNT"`);
        await queryRunner.query(`DROP TABLE "transactions"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_USER_USERNAME"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_identitydoctype_enum"`);
    }
}
