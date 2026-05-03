import { Command } from '@Shared/domain/CommandBus/Command'

export class DeleteCardCommand implements Command {
  constructor (
        readonly id: string
  ) {}
}
