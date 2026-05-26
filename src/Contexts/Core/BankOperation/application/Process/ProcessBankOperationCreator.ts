<<<<<<< HEAD
import { AccountMovementType } from "src/Contexts/Core/AccountMovement/domain/ValueObjects/AccountMovementType"
=======
import { AccountMovementType } from "src/Contexts/Core/CardMovement/domain/ValueObjects/CardMovementType"
>>>>>>> c914353dbcac19047f94d4043d947759801ff024
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