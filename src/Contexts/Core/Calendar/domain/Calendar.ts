import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { Id } from './ValueObjects/Id'
import { DateAt } from './ValueObjects/DateAt'
import { UserIds } from './ValueObjects/UserIds'
import { Content } from './ValueObjects/Content'
import { Nullable } from '@Shared/domain/Nullable'
import { EntityId } from './ValueObjects/EntityId'
import { EntityType } from './ValueObjects/EntityType'
import { CreatedAt } from './ValueObjects/CreatedAt'
import { UpdatedAt } from './ValueObjects/UpdatedAt'
import { CommunityId } from './ValueObjects/CommunityId'

export class Calendar extends AggregateRoot {
  constructor (
        readonly id: Id,
        readonly dateAt: DateAt,
        readonly userIds: UserIds,
        readonly communityId: CommunityId,
        readonly content: Content,
        readonly entityId: Nullable<EntityId>,
        readonly entityType: Nullable<EntityType>,
        readonly createdAt: CreatedAt,
        readonly updatedAt: UpdatedAt
  ) {
    super()
  }
}
