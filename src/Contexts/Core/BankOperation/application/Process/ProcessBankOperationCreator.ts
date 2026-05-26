import { AccountMovementType } from "src/Contexts/Core/AccountMovement/domain/ValueObjects/AccountMovementType"
import { OperationStrategyRegistry } from "./registry/OperationStrategyRegistry"

export class ProcessBankOperationCreator {
  constructor(
    private readonly registry: OperationStrategyRegistry
  ) {}

  async run(type: AccountMovementType, payload: any): Promise<void> {
    const strategy = this.registry.get(type.toString())

    await strategy.execute(payload)
  }
}