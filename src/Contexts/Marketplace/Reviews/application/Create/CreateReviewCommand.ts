import { Command } from '@Shared/domain/CommandBus/Command'
import { Nullable } from '@Shared/domain/Nullable'

export class CreateReviewCommand implements Command {
  constructor (
        readonly id: string,
        readonly productId: string,
        readonly userId: string,
        readonly content: Nullable<string>,
        readonly rating: number
  ) {}
}
