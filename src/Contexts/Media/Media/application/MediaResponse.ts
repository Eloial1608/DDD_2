import { Nullable } from '@Shared/domain/Nullable'
import { Media } from '../domain/Media'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'

export type MediaResponseBody = {
    readonly id: string
    readonly communityId: string
    readonly userId: string
    readonly title: string
    readonly contentIds: string[]
    readonly bannerUrl: Nullable<string>
    readonly spaceId: string
    readonly author: {
      id: string
      mainId: string
      name: string
      username: string
      bannerUrl: Nullable<string>
      pictureUrl: Nullable<string>
    }
    readonly isPaid: boolean
    totalLikes: number
    totalComments: number
    readonly price: Nullable<{value: number, currency: string}>
    readonly createdAt: Date
    readonly updatedAt: Date
}

export class MediaResponse implements QueryResponse<MediaResponseBody> {
  response: MediaResponseBody

  constructor (media: Media) {
    this.response = {
      id: media.id.valueOf(),
      communityId: media.communityId.valueOf(),
      userId: media.userId.valueOf(),
      title: media.title.valueOf(),
      spaceId: media.spaceId.valueOf(),
      contentIds: media.contentIds.valueOf(),
      bannerUrl: media.bannerUrl?.valueOf(),
      author: media.author.toPrimitives(),
      isPaid: media.isPaid.valueOf(),
      price: media.price
        ? {
            value: media.price.value.valueOf(),
            currency: media.price.currency.valueOf()
          }
        : null,
      totalLikes: media.totalLikes.valueOf(),
      totalComments: media.totalComments.valueOf(),
      createdAt: media.createdAt.valueOf(),
      updatedAt: media.updatedAt.valueOf()
    }
  }
}
