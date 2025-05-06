import { Nullable } from '@Shared/domain/Nullable'
import { CreateThreadCommand } from '@Threads/Thread/application/Create/CreateThreadCommand'
import { Thread } from '@Threads/Thread/domain/Thread'

export class CreateThreadCommandMother {
  static create (
    id:string,
    communityId: string,
    spaceId: string,
    title: Nullable<string>,
    parentThreadId: Nullable<string>,
    mainThreadId: Nullable<string>,
    userId: string,
    content: string,
    bannerUrl: Nullable<string>,
    isPaid: boolean,
    price: Nullable<{
            value: number,
            currency: string
    }>
  ): CreateThreadCommand {
    return new CreateThreadCommand(
      id,
      communityId,
      spaceId,
      title,
      parentThreadId,
      mainThreadId,
      userId,
      content,
      bannerUrl,
      isPaid,
      price
    )
  }

  static fromAggregate (thread: Thread): CreateThreadCommand {
    return this.create(
      thread.id.valueOf(),
      thread.communityId.valueOf(),
      thread.spaceId.valueOf(),
      thread.title?.valueOf(),
      thread.parentThreadId?.valueOf(),
      thread.mainThreadId?.valueOf(),
      thread.userId.valueOf(),
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
