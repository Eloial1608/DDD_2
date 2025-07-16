import type { Command } from '@Shared/domain/CommandBus/Command'

export class DeleteDigitalStockCommand implements Command {
  constructor (
    readonly id: string
  ) {}
}
