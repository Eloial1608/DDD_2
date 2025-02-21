import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { Accessibility } from './ValueObjects/Accessibility'
import { CommunityId } from './ValueObjects/CommunityId'
import { Configuration } from './ValueObjects/Configuration'
import { Id } from './ValueObjects/Id'
import { Type } from './ValueObjects/Type'

export class Space extends AggregateRoot {
  constructor (
        readonly id: Id,
        readonly communityId: CommunityId,
        readonly accessibility: Accessibility,
        readonly configuration: Configuration,
        readonly type: Type
  ) {
    super()
  }
}
