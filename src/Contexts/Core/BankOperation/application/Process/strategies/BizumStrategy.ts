import { CommandBus } from "@Shared/domain/CommandBus/CommandBus"
import { AccountMovementCommand } from "@Core/AccountMovement/application/Create/AccountMovementCommand"
import { AccountMovementTypeEnum } from "@Core/AccountMovement/domain/ValueObjects/AccountMovementType"
import { OperationStrategy } from "./OperationStrategy"
import { BizumPayload } from "../dto/payloads/BizumPayload"
import { UpdateAccountBalanceCommand } from "src/Contexts/Core/Account/application/UpdateBalance/UpdateAccountBalanceCommand"
import { FindAcountByIdQuery } from "src/Contexts/Core/Account/application/FindById/FindAccountByIdQuery"
import { AccountResponse } from "src/Contexts/Core/Account/application/AccountResponse"
import { QueryBus } from "src/Contexts/Shared/domain/QueryBus/QueryBus"
import { AccountRepository } from "@Core/Account/domain/AccountRepository"

export class BizumStrategy
  implements OperationStrategy<BizumPayload["payload"]> {

  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly accountRepository: AccountRepository
  ) {}

  async execute(
    payload: BizumPayload["payload"]
  ): Promise<void> {
    const originQuery = new FindAcountByIdQuery(payload.originAccountId)
    const originBankAccount = await this.queryBus.ask<AccountResponse>(originQuery)

    if (originBankAccount.response.balance < payload.amount) {
      throw new Error("Insufficient funds")
    }

    // Find destination account by phone number or account ID
    let destinationAccountId = payload.destinationAccountId
    if (payload.phone) {
      const destinationByPhone = await this.accountRepository.findByPhoneNumber(payload.phone)
      if (!destinationByPhone) {
        throw new Error("Destination account not found by phone number")
      }
      destinationAccountId = destinationByPhone.id.valueOf()
    }

    const operationId = crypto.randomUUID()

    await this.commandBus.dispatch(
      new AccountMovementCommand(
        crypto.randomUUID(),
        operationId,
        payload.originAccountId,
        -payload.amount,
        AccountMovementTypeEnum.BIZUM,
        payload.description ?? "Bizum sent",
        destinationAccountId
      )
    )

    await this.commandBus.dispatch(
      new UpdateAccountBalanceCommand(
        originBankAccount.response.id,
        originBankAccount.response.balance - payload.amount
      )
    )

    await this.commandBus.dispatch(
      new AccountMovementCommand(
        crypto.randomUUID(),
        operationId,
        destinationAccountId,
        -payload.amount,
        AccountMovementTypeEnum.BIZUM,
        payload.description ?? "Bizum received",
        payload.originAccountId
      )
    )

    const destinationQuery = new FindAcountByIdQuery(destinationAccountId)
    const destinationBankAccount = await this.queryBus.ask<AccountResponse>(destinationQuery)

    await this.commandBus.dispatch(
      new UpdateAccountBalanceCommand( 
        destinationBankAccount.response.id,
        destinationBankAccount.response.balance + payload.amount
      )
    )
    console.log("Destination account movement created")
  }
}