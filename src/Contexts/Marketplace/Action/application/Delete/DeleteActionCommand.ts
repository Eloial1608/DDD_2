import type { Command } from '@Shared/domain/CommandBus/Command'

export class DeleteActionCommand implements Command {
  constructor (
        readonly id: string
  ) {}
}
