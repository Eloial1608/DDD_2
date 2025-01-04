import { Command } from '@Shared/domain/CommandBus/Command'
import { Nullable } from '@Shared/domain/Nullable'

export class CreateCommentCommand implements Command {
  constructor (
    readonly id: string,
    readonly postId: string,
    readonly userId: string,
    readonly author: {
      id: string,
      mainId: string,
      name: string,
      username: string,
      pictureUrl: Nullable<string>,
      bannerUrl: Nullable<string>
    },
    readonly content: string
  ) {}
}
