import type { AvailableDigitalStockType } from '@Marketplace/DigitalStock/domain/ValueObjects/DigitalStockType'
import type { Command } from '@Shared/domain/CommandBus/Command'

export class UpdateDigitalStockCommand implements Command {
  constructor (
    readonly id: string,
    readonly type: AvailableDigitalStockType,
    readonly value: string,
    readonly isAvailable: boolean
  ) {}
}
