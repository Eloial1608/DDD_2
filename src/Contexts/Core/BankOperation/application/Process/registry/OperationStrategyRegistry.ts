import { OperationStrategy } from "../strategies/OperationStrategy"

export class OperationStrategyRegistry {
  constructor(
    private readonly strategies: Map<string, OperationStrategy>
  ) {}

  get(type: string): OperationStrategy {
    const strategy = this.strategies.get(type)

    if (!strategy) {
      throw new Error(`Unsupported operation type: ${type}`)
    }

    return strategy
  }
}