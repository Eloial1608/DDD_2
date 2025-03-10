import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { Id } from './ValueObjects/Id'
import { CommunityId } from './ValueObjects/CommunityId'
import { CreatedAt } from './ValueObjects/CreatedAt'
import { UpdatedAt } from './ValueObjects/UpdatedAt'
import { ContentCreatedDomainEvent } from './Events/ContentCreatedDomainEvent'
import { ContentUpdatedDomainEvent } from './Events/ContentUpdatedDomainEvent'
import { ContentDeletedDomainEvent } from './Events/ContentDeletedDomainEvent'
import { MediaId } from './ValueObjects/MediaId'
import { Type } from './ValueObjects/Type'
import { Url } from './ValueObjects/Url'

export class Content extends AggregateRoot {
  constructor (
        readonly id: Id,
        readonly communityId: CommunityId,
        readonly mediaId: MediaId,
        readonly type: Type,
        readonly url: Url,
        readonly createdAt: CreatedAt,
        readonly updatedAt: UpdatedAt
  ) {
    super()
  }

  static create (
    id: Id,
    communityId: CommunityId,
    mediaId: MediaId,
    type: Type,
    url: Url
  ): Content {
    const content = new Content(
      id,
      communityId,
      mediaId,
      type,
      url,
      new CreatedAt(new Date()),
      new UpdatedAt(new Date())
    )

    content.record(ContentCreatedDomainEvent.fromAggregate(content))

    return content
  }

  update (
    type: Type,
    url: Url
  ): Content {
    const content = new Content(
      this.id,
      this.communityId,
      this.mediaId,
      type,
      url,
      this.createdAt,
      new UpdatedAt(new Date())
    )

    content.record(ContentUpdatedDomainEvent.fromAggregate(content))

    return content
  }

  delete (): Content {
    const content = new Content(
      this.id,
      this.communityId,
      this.mediaId,
      this.type,
      this.url,
      this.createdAt,
      this.updatedAt
    )

    content.record(ContentDeletedDomainEvent.fromAggregate(content))

    return content
  }
}
