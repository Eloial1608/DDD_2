import { Command } from '@Shared/domain/CommandBus/Command'

export class DeleteReviewCommand implements Command {
  constructor (
        readonly id: string
  ) {}
}
