import { AccountRepository } from "@Core/Account/domain/AccountRepository"
import { TransactionRepository } from "@Core/Transaction/domain/TransactionRepository"
import { AccountId } from "@Core/Transaction/domain/ValueObjects/AccountId"
import { Balance } from "@Core/Transaction/domain/ValueObjects/Balance"
import { Concept } from "@Core/Transaction/domain/ValueObjects/Concept"
import { Reference } from "@Core/Transaction/domain/ValueObjects/Reference"
import { Id } from "@Core/Transaction/domain/ValueObjects/Id"
import { Transaction } from "@Core/Transaction/domain/Transaction"
import { AccountNotFound } from "@Core/Account/domain/Errors/AccountNotFound"
import { InsufficientFunds } from "@Core/Transaction/domain/Errors/InsufficientFunds"

export class Creator {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly transactionRepository: TransactionRepository
  ) {}

  async run(
    type: string,
    balance: Balance,
    fromAccountId: AccountId | null,
    toAccountId: AccountId | null,
    concept: Concept | null,
    reference: Reference | null
  ): Promise<void> {

    const id = new Id(Id.random().toString())

    if (type === "TRANSFER") {
      if (!fromAccountId || !toAccountId) {
        throw new Error("fromAccountId and toAccountId required")
      }

      const from = await this.accountRepository.find(fromAccountId)
      const to = await this.accountRepository.find(toAccountId)

      if (!from) throw new AccountNotFound(fromAccountId)
      if (!to) throw new AccountNotFound(toAccountId)

      if (from.balance.valueOf() < balance.valueOf()) {
        throw new InsufficientFunds(from.balance.valueOf(), balance.valueOf())
      }

      const updatedFrom = from.update(
        from.iban,
        new Balance(from.balance.valueOf() - balance  .valueOf()),
        from.type_account
      )

      const updatedTo = to.update(
        to.iban,
        new Balance(to.balance.valueOf() + balance.valueOf()),
        to.type_account
      )

      await this.accountRepository.persist(updatedFrom)
      await this.accountRepository.persist(updatedTo)

      const transaction = Transaction.transfer(
        id,
        fromAccountId,
        toAccountId,
        balance,
        concept ?? undefined,
        reference ?? undefined
      )

      await this.transactionRepository.persist(transaction)

      return
    }

    if (type === "PAYMENT") {
      if (!fromAccountId) {
        throw new Error("fromAccountId required")
      }

      const account = await this.accountRepository.find(fromAccountId)
      if (!account) throw new AccountNotFound(fromAccountId)

      if (account.balance.valueOf() < balance.valueOf()) {
        throw new InsufficientFunds(account.balance.valueOf(), balance.valueOf())
      }

      const updatedAccount = account.update(
        account.iban,
        new Balance(account.balance.valueOf() - balance.valueOf()),
        account.type_account
      )

      await this.accountRepository.persist(updatedAccount)

      const transaction = Transaction.payment(
        id,
        fromAccountId,
        balance,
        concept ?? undefined,
        reference ?? undefined
      )

      await this.transactionRepository.persist(transaction)

      return
    }

    if (type === "INCOME") {
      if (!toAccountId) {
        throw new Error("toAccountId required")
      }

      const account = await this.accountRepository.find(toAccountId)
      if (!account) throw new AccountNotFound(toAccountId)

      const updatedAccount = account.update(
        account.iban,
        new Balance(account.balance.valueOf() + balance.valueOf()),
        account.type_account
      )

      await this.accountRepository.persist(updatedAccount)

      const transaction = Transaction.income(
        id,
        toAccountId,
        balance,
        concept ?? undefined,
        reference ?? undefined
      )

      await this.transactionRepository.persist(transaction)

      return
    }

    throw new Error(`Invalid transaction type: ${type}`)
  }
}