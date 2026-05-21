import { CommandBus } from "@Shared/domain/CommandBus/CommandBus"
import { QueryBus } from "@Shared/domain/QueryBus/QueryBus"
import { OperationStrategy } from "../strategies/OperationStrategy"
import { OperationStrategyRegistry } from "./OperationStrategyRegistry"
import { DepositStrategy } from "../strategies/DepositStrategy"
import { TransferStrategy } from "../strategies/TransferStrategy"
import { WithdrawalStrategy } from "../strategies/WithdrawalStrategy"
import { BizumStrategy } from "../strategies/BizumStrategy"
import { DebitCardPaymentStrategy } from "../strategies/DebitCardPaymentStrategy"
import { CreditCardPaymentStrategy } from "../strategies/CreditCardPaymentStrategy"
import { CreditCardDebtPaymentStrategy } from "../strategies/CreditCardDebtPaymentStrategy"

export class OperationStrategyRegistryFactory {
  static create(commandBus: CommandBus, queryBus: QueryBus): OperationStrategyRegistry {
    const strategies = new Map<string, OperationStrategy>([
      ['DEPOSIT', new DepositStrategy(commandBus, queryBus)],
      ['TRANSFER', new TransferStrategy(commandBus, queryBus)],
      ['WITHDRAWAL', new WithdrawalStrategy(commandBus, queryBus)],
      ['BIZUM', new BizumStrategy(commandBus, queryBus)],
      ['DEBIT_CARD_PAYMENT', new DebitCardPaymentStrategy(commandBus, queryBus)],
      ['CREDIT_CARD_PAYMENT', new CreditCardPaymentStrategy(commandBus, queryBus)],
      ['CREDIT_CARD_DEBT_PAYMENT', new CreditCardDebtPaymentStrategy(commandBus, queryBus)],
    ])

    return new OperationStrategyRegistry(strategies)
  }
}
