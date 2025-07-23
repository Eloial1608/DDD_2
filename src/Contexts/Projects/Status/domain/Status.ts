import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { Id } from './ValueObjects/Id'
import { Title } from './ValueObjects/Title'
import { Nullable } from '@Shared/domain/Nullable'
import { Description } from './ValueObjects/Description'
import { CreatedAt } from './ValueObjects/CreatedAt'
import { UpdatedAt } from './ValueObjects/UpdatedAt'
import { DeletedAt } from './ValueObjects/DeletedAt'
import { CommunityId } from './ValueObjects/CommunityId'
import { ProjectId } from './ValueObjects/ProjectId'
import { Order } from './ValueObjects/Order'
import { Color } from './ValueObjects/Color'

export class Status extends AggregateRoot {
  constructor (
    readonly id: Id,
    readonly title: Title,
    readonly description: Nullable<Description>,
    readonly order: Order,
    readonly color: Color,
    readonly projectId: ProjectId,
    readonly communityId: CommunityId,
    readonly createdAt: CreatedAt,
    readonly updatedAt: UpdatedAt,
    readonly deletedAt: Nullable<DeletedAt>
  ) {
    super()
  }
}
