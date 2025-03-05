import { CreateMediaCommand } from '@Media/Media/application/Create/CreateMediaCommand'
import { Media } from '@Media/Media/domain/Media'
import { Nullable } from '@Shared/domain/Nullable'

export class CreateMediaCommandMother {
  static create (
    id: string,
    communityId: string,
    userId: string,
    spaceId: string,
    title: string,
    bannerUrl: Nullable<string>,
    isPaid: boolean,
    price: Nullable<{
      value: number,
      currency: string
  }>
  ): CreateMediaCommand {
    return new CreateMediaCommand(
      id,
      communityId,
      userId,
      spaceId,
      title,
      bannerUrl,
      isPaid,
      price
    )
  }

  static fromAggregate (media: Media): CreateMediaCommand {
    return this.create(
      media.id.valueOf(),
      media.communityId.valueOf(),
      media.userId.valueOf(),
      media.spaceId.valueOf(),
      media.title.valueOf(),
      media.bannerUrl?.valueOf(),
      media.isPaid.valueOf(),
      media.price
        ? {
            value: media.price.value.valueOf(),
            currency: media.price.currency.valueOf()
          }
        : null
    )
  }
}
