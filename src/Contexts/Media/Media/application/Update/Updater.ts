import { NotAllowedToPersistMedia } from '@Media/Media/domain/Errors/NotAllowedToPersistMedia'
import { MediaNotFound } from '@Media/Media/domain/Errors/MediaNotFound'
import { MediaRepository } from '@Media/Media/domain/MediaRepository'
import { BannerUrl } from '@Media/Media/domain/ValueObjects/BannerUrl'
import { CommunityId } from '@Media/Media/domain/ValueObjects/CommunityId'
import { Id } from '@Media/Media/domain/ValueObjects/Id'
import { IsPaid } from '@Media/Media/domain/ValueObjects/IsPaid'
import { Price } from '@Media/Media/domain/ValueObjects/Price'
import { SpaceId } from '@Media/Media/domain/ValueObjects/SpaceId'
import { Title } from '@Media/Media/domain/ValueObjects/Title'
import { UserId } from '@Media/Media/domain/ValueObjects/UserId'
import { FindSpaceByIdQuery } from '@Media/Space/application/FindById/FindSpaceByIdQuery'
import { SpaceResponse } from '@Media/Space/application/SpaceResponse'
import { FindUsersByCriteriaQuery } from '@Media/User/application/FindByCriteria/FindUsersByCriteriaQuery'
import { UserCollectionResponse } from '@Media/User/application/UserCollectionResponse'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { Nullable } from '@Shared/domain/Nullable'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { MediaConfiguration } from '@Shared/domain/SharedValueObjects/Space/Configuration/MediaConfiguration'

export class Updater {
  constructor (private readonly repository: MediaRepository, private readonly eventBus: EventBus, private readonly queryBus: QueryBus) {}

  async run (
    id: Id,
    communityId: CommunityId,
    userId: UserId,
    spaceId: SpaceId,
    title: Title,
    bannerUrl: Nullable<BannerUrl>,
    isPaid: IsPaid,
    price: Nullable<Price>
  ) {
    if ((isPaid.valueOf() && !price) || (price && !isPaid.valueOf())) return

    const media = await this.repository.find(id)

    if (!media) throw new MediaNotFound(id)

    if (media.userId.valueOf() !== userId.valueOf()) throw new NotAllowedToPersistMedia(media.id)

    const user = await this.findUserByIdAndCommunityId(userId, communityId)

    if (!user) throw new NotAllowedToPersistMedia(media.id)

    const space = await this.findSpaceById(spaceId)

    if (space.communityId.valueOf() !== communityId.valueOf()) throw new NotAllowedToPersistMedia(media.id)

    if (!(space.configuration as MediaConfiguration['configuration']).allowsPaid && isPaid.valueOf()) return
    if ((space.configuration as MediaConfiguration['configuration']).mustHaveBanner && !bannerUrl?.valueOf()) return

    const updatedMedia = media.update(
      id,
      title,
      bannerUrl,
      isPaid,
      price
    )

    await this.repository.persist(updatedMedia)
    await this.eventBus.publish(updatedMedia.pullDomainEvents())
  }

  private async findUserByIdAndCommunityId (id: UserId, communityId: CommunityId) {
    const userQuery = new FindUsersByCriteriaQuery([
      new Map<string, string>([
        ['field', 'id'],
        ['operator', '='],
        ['value', id.valueOf()]
      ]),
      new Map<string, string>([
        ['field', 'communityId'],
        ['operator', '='],
        ['value', communityId.valueOf()]
      ])
    ])

    return (await this.queryBus.ask<UserCollectionResponse>(userQuery)).response.pop()
  }

  private async findSpaceById (id: SpaceId) {
    const spaceQuery = new FindSpaceByIdQuery(id.valueOf())

    return (await this.queryBus.ask<SpaceResponse>(spaceQuery)).response
  }
}
