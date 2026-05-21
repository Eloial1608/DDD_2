import { Command } from '@Shared/domain/CommandBus/Command'

export class CreateCardMovementCommand implements Command {
  constructor(
    readonly id: string,
    readonly operationId: string,
    readonly cardId: string,
    readonly amount: number,
    readonly description?: string,
    readonly accountMovementId?: string
  ) {}
}