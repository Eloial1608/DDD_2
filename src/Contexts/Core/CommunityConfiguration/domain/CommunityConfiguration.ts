import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { Id } from './ValueObjects/Id'
import { Nullable } from '../../../Shared/domain/Nullable'
import { CommunityId } from './ValueObjects/CommunityId'
import { CreatedAt } from './ValueObjects/CreatedAt'
import { UpdatedAt } from './ValueObjects/UpdatedAt'
import { DeletedAt } from './ValueObjects/DeletedAt'
import { CurrentTheme } from './ValueObjects/CurrentTheme'
import { CommunityConfigurationUpdatedDomainEvent } from './Events/CommunityConfigurationUpdatedDomainEvent'
import { CommunityConfigurationCreatedDomainEvent } from './Events/CommunityConfigurationCreatedDomainEvent'

export class CommunityConfiguration extends AggregateRoot {
  constructor (
        readonly id: Id,
        readonly communityId: Nullable<CommunityId>,
        readonly currentTheme: Nullable<CurrentTheme>,
        readonly createdAt: CreatedAt,
        readonly updatedAt: UpdatedAt,
        readonly deletedAt: Nullable<DeletedAt>

  ) {
    super()
  }

  static create (
    id: Id,
    communityId: Nullable<CommunityId>,
    currentTheme: Nullable<CurrentTheme>
  ) {
    const communityconfiguration = new CommunityConfiguration(
      id,
      communityId,
      currentTheme,
      new CreatedAt(new Date()),
      new UpdatedAt(new Date()),
      null
    )

    communityconfiguration.record(CommunityConfigurationCreatedDomainEvent.fromAggregate(communityconfiguration))

    return communityconfiguration
  }

  delete () {
    const communityconfiguration = new CommunityConfiguration(
      this.id,
      this.communityId,
      this.currentTheme,
      this.createdAt,
      this.updatedAt,
      new DeletedAt(new Date())
    )

    // communityconfiguration.record(CommunityConfigurationDeletedDomainEvent.fromAggregate(communityconfiguration))

    return communityconfiguration
  }

  update (
    id: Id,
    communityId: Nullable<CommunityId>,
    currentTheme: Nullable<CurrentTheme>
  ): CommunityConfiguration {
    const communityconfiguration = new CommunityConfiguration(
      id,
      communityId,
      currentTheme,
      this.createdAt,
      new UpdatedAt(new Date()),
      null
    )

    communityconfiguration.record(CommunityConfigurationUpdatedDomainEvent.fromAggregate(communityconfiguration))

    return communityconfiguration
  }
}
