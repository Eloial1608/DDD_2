import { Content } from '@Media/Content/domain/Content'
import { ContentRepository } from '@Media/Content/domain/ContentRepository'
import { NotAllowedToPersistContent } from '@Media/Content/domain/Errors/NotAllowedToPersistContent'
import { CommunityId } from '@Media/Content/domain/ValueObjects/CommunityId'
import { Id } from '@Media/Content/domain/ValueObjects/Id'
import { MediaId } from '@Media/Content/domain/ValueObjects/MediaId'
import { Type } from '@Media/Content/domain/ValueObjects/Type'
import { Url } from '@Media/Content/domain/ValueObjects/Url'
import { FindMediaByCriteriaQuery } from '@Media/Media/application/FindByCriteria/FindMediaByCriteriaQuery'
import { MediaCollectionResponse } from '@Media/Media/application/MediaCollectionResponse'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'

export class Creator {
  constructor (private readonly repository: ContentRepository, private readonly eventBus: EventBus, private readonly queryBus: QueryBus) {}

  async run (
    id: Id,
    communityId: CommunityId,
    mediaId: MediaId,
    type: Type,
    url: Url
  ) {
    const existing = await this.repository.find(id)

    if (existing) return

    const media = await this.findMediaByIdAndCommunityId(mediaId, communityId)

    if (!media) throw new NotAllowedToPersistContent(id)

    const content = Content.create(
      id,
      communityId,
      mediaId,
      type,
      url
    )

    await this.repository.persist(content)
    await this.eventBus.publish(content.pullDomainEvents())
  }

  private async findMediaByIdAndCommunityId (id: MediaId, communityId: CommunityId) {
    const mediaQuery = new FindMediaByCriteriaQuery([
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

    return (await this.queryBus.ask<MediaCollectionResponse>(mediaQuery)).response.pop()
  }
}
