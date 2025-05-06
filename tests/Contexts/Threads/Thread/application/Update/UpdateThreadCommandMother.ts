import { UpdateThreadCommand } from '@Threads/Thread/application/Update/UpdateThreadCommand'
import { Thread } from '@Threads/Thread/domain/Thread'
import { Nullable } from '@Shared/domain/Nullable'

export class UpdateThreadCommandMother {
  static update (
    id: string,
    communityId: string,
    userId: string,
    spaceId: string,
    title: Nullable<string>,
    parentThreadId: Nullable<string>,
    mainThreadId: Nullable<string>,
    content: string,
    bannerUrl: Nullable<string>,
    isPaid: boolean,
    price: Nullable<{
      value: number,
      currency: string
  }>
  ): UpdateThreadCommand {
    return new UpdateThreadCommand(
      id,
      communityId,
      userId,
      spaceId,
      title,
      parentThreadId,
      mainThreadId,
      content,
      bannerUrl,
      isPaid,
      price
    )
  }

  static fromAggregate (thread: Thread): UpdateThreadCommand {
    return this.update(
      thread.id.valueOf(),
      thread.communityId.valueOf(),
      thread.userId.valueOf(),
      thread.spaceId.valueOf(),
      thread.title?.valueOf(),
      thread.parentThreadId?.valueOf(),
      thread.mainThreadId?.valueOf(),
      thread.content.valueOf(),
      thread.bannerUrl?.valueOf(),
      thread.isPaid.valueOf(),
      thread.price
        ? {
            value: thread.price.value.valueOf(),
            currency: thread.price.currency.valueOf()
          }
        : null
    )
  }
}
