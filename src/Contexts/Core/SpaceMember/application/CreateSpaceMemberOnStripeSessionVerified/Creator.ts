import { SpaceMemberRepository } from '@Core/SpaceMember/domain/SpaceMemberRepository'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { Nullable } from '@Shared/domain/Nullable'
import { SpaceMember } from '@Core/SpaceMember/domain/SpaceMember'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Filters } from '@Shared/domain/Criteria/Filters'
import { Filter } from '@Shared/domain/Criteria/Filter'
import { CommunityId } from '@Core/SpaceMember/domain/ValueObjects/CommunityId'
import { Id } from '@Core/SpaceMember/domain/ValueObjects/Id'
import { UserId } from '@Core/SpaceMember/domain/ValueObjects/UserId'
import { SpaceId } from '@Core/SpaceMember/domain/ValueObjects/SpaceId'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { FindSpaceByIdQuery } from '@Core/Space/application/FindById/FindSpaceByIdQuery'
import { SpaceResponse } from '@Core/Space/application/SpaceResponse'
import { IsModerator } from '@Core/SpaceMember/domain/ValueObjects/IsModerator'
import { FindUsersByCriteriaQuery } from '@Core/User/application/FindByCriteria/FindUsersByCriteriaQuery'
import { UserCollectionResponse } from '@Core/User/application/UserCollectionResponse'

export class Creator {
  constructor (private readonly repository: SpaceMemberRepository, private readonly queryBus: QueryBus, private readonly eventBus: EventBus) {}

  async run (
    id: Id,
    userId: UserId,
    spaceId: SpaceId
  ) {
    const space = await this.getSpace(spaceId)

    if (!space) return

    const existing = await this.getSpaceMember(userId, spaceId, space.communityId)

    if (existing) return

    const user = await this.getUser(userId, space.communityId)

    if (!user) return

    const spaceMember = SpaceMember.create(
      id,
      userId,
      spaceId,
      new CommunityId(space.communityId),
      null,
      null,
      new IsModerator((user.isAdmin || user.isOwner))
    )

    await this.repository.persist(spaceMember)
    await this.eventBus.publish(spaceMember.pullDomainEvents())
  }

  private async getSpaceMember (userId: UserId, spaceId: SpaceId, communityId: string): Promise<Nullable<SpaceMember>> {
    return (await this.repository.search(
      new Criteria(
        new Filters([
          Filter.simple('userId', '=', userId.valueOf()),
          Filter.simple('spaceId', '=', spaceId.valueOf()),
          Filter.simple('communityId', '=', communityId.valueOf())
        ])
      )
    )).pop()
  }

  private async getUser (userId: UserId, communityId: string) {
    const query = new FindUsersByCriteriaQuery([
      new Map<string, string>([
        ['field', 'userId'],
        ['operator', '='],
        ['value', userId.valueOf()]
      ]),
      new Map<string, string>([
        ['field', 'communityId'],
        ['operator', '='],
        ['value', communityId.valueOf()]
      ])
    ])

    return (await this.queryBus.ask<UserCollectionResponse>(query)).response.pop()
  }

  private async getSpace (spaceId: SpaceId) {
    const query = new FindSpaceByIdQuery(spaceId.valueOf())

    return (await this.queryBus.ask<SpaceResponse>(query)).response
  }
}
