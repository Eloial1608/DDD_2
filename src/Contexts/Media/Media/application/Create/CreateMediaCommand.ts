import { Command } from '@Shared/domain/CommandBus/Command'
import { Nullable } from '@Shared/domain/Nullable'

export class CreateMediaCommand implements Command {
  constructor (
        readonly id: string,
        readonly communityId: string,
        readonly userId: string,
        readonly spaceId: string,
        readonly title: string,
        readonly contentIds: string[],
        readonly bannerUrl: Nullable<string>,
        readonly isPaid: boolean,
        readonly price: Nullable<{
            value: number,
            currency: string
        }>
  ) {}
}
