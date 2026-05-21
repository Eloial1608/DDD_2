import { CommandBus } from "@Shared/domain/CommandBus/CommandBus"
import { QueryBus } from "@Shared/domain/QueryBus/QueryBus"
import { OperationStrategy } from "../strategies/OperationStrategy"
import { OperationStrategyRegistry } from "./OperationStrategyRegistry"
import { DepositStrategy } from "../strategies/DepositStrategy"
import { PaymentStrategy } from "../strategies/PaymentStrategy"
import { TransferStrategy } from "../strategies/TransferStrategy"
import { WithdrawalStrategy } from "../strategies/WithdrawalStrategy"
import { RefundStrategy } from "../strategies/RefundStrategy"
import { BizumStrategy } from "../strategies/BizumStrategy"
import { DebitCardPaymentStrategy } from "../strategies/DebitCardPaymentStrategy"
import { CreditCardPaymentStrategy } from "../strategies/CreditCardPaymentStrategy"
import { CreditCardDebtPaymentStrategy } from "../strategies/CreditCardDebtPaymentStrategy"

export class OperationStrategyRegistryFactory {
  static create(commandBus: CommandBus, queryBus: QueryBus): OperationStrategyRegistry {
    const strategies = new Map<string, OperationStrategy>([
      ['DEPOSIT', new DepositStrategy(commandBus)],
      ['PAYMENT', new PaymentStrategy(commandBus)],
      ['TRANSFER', new TransferStrategy(commandBus)],
      ['WITHDRAWAL', new WithdrawalStrategy(commandBus)],
      ['REFUND', new RefundStrategy(commandBus)],
      ['BIZUM', new BizumStrategy(commandBus, queryBus)],
      ['DEBIT_CARD_PAYMENT', new DebitCardPaymentStrategy(commandBus)],
      ['CREDIT_CARD_PAYMENT', new CreditCardPaymentStrategy(commandBus)],
      ['CREDIT_CARD_DEBT_PAYMENT', new CreditCardDebtPaymentStrategy(commandBus, queryBus)],
    ])

    return new OperationStrategyRegistry(strategies)
  }
}
