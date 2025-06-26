import { Command } from '@Shared/domain/CommandBus/Command'

export class DeleteProductCommand implements Command {
  constructor (
        readonly id: string
  ) {}
}
