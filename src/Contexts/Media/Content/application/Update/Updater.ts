import { NotAllowedToPersistContent } from '@Media/Content/domain/Errors/NotAllowedToPersistContent'
import { ContentNotFound } from '@Media/Content/domain/Errors/ContentNotFound'
import { ContentRepository } from '@Media/Content/domain/ContentRepository'
import { CommunityId } from '@Media/Content/domain/ValueObjects/CommunityId'
import { Id } from '@Media/Content/domain/ValueObjects/Id'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { Type } from '@Media/Content/domain/ValueObjects/Type'
import { Url } from '@Media/Content/domain/ValueObjects/Url'
import { FindMediaByCriteriaQuery } from '@Media/Media/application/FindByCriteria/FindMediaByCriteriaQuery'
import { MediaId } from '@Media/Content/domain/ValueObjects/MediaId'
import { MediaCollectionResponse } from '@Media/Media/application/MediaCollectionResponse'

export class Updater {
  constructor (private readonly repository: ContentRepository, private readonly eventBus: EventBus, private readonly queryBus: QueryBus) {}

  async run (
    id: Id,
    communityId: CommunityId,
    type: Type,
    url: Url
  ) {
    const content = await this.repository.find(id)

    if (!content || content.communityId.valueOf() !== communityId.valueOf()) throw new ContentNotFound(id)

    const media = await this.findMediaByIdAndCommunityId(content.mediaId, content.communityId)

    if (!media) throw new NotAllowedToPersistContent(content.id)

    const updatedContent = content.update(
      type,
      url
    )

    await this.repository.persist(updatedContent)
    await this.eventBus.publish(updatedContent.pullDomainEvents())
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
