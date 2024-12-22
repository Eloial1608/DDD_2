import { BanUserOnParentUserBannedHandler } from '@Core/User/application/BanUserOnParentUserBanned/BanUserOnParentUserBannedHandler'
import { Updater } from '@Core/User/application/BanUserOnParentUserBanned/Updater'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { UserRepositoryMock } from '../../__mocks__/UserRepositoryMock'
import { UserMother } from '../../domain/UserMother'
import { UserBannedDomainEvent } from '@Core/User/domain/Events/UserBannedDoaminEvent'
import { QueryBusMock } from '@Tests/Contexts/Shared/infrastructure/QueryBus/QueryBusMock'
import { CommunityMother } from '@Tests/Contexts/Core/Community/domain/CommunityMother'
import { Id } from '@Core/Community/domain/ValueObjects/Id'
import { FindCommunitiesByCriteriaQuery } from '@Core/Community/application/FindByCriteria/FindCommunitiesByCriteriaQuery'
import { CommunityCollectionResponse } from '@Core/Community/application/CommunityCollectionResponse'
import { IsBanned } from '@Core/User/domain/ValueObjects/IsBanned'

let eventBus: EventBusMock
let repository: UserRepositoryMock
let queryBus: QueryBusMock
let handler: BanUserOnParentUserBannedHandler
let updater: Updater

describe('BanUserOnParentUserBannedHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new UserRepositoryMock()
    queryBus = new QueryBusMock()
    updater = new Updater(repository, eventBus, queryBus)
    handler = new BanUserOnParentUserBannedHandler(updater)
  })

  test('Delete user', async () => {
    const existignUser = UserMother.random()

    const community = CommunityMother.create({
      id: new Id(existignUser.communityId.valueOf())
    })

    const toModifyUser = UserMother.create({ mainId: existignUser.mainId })

    const userCollection = [toModifyUser]

    repository.returnOnSearch(userCollection)
    queryBus.returnOnQuery(new FindCommunitiesByCriteriaQuery(), new CommunityCollectionResponse([community]))

    repository.returnOnFind(existignUser)

    const event = UserBannedDomainEvent.fromAggregate(existignUser)

    await handler.on(event)

    const expectedUser = UserMother.create({
      ...toModifyUser,
      isBanned: new IsBanned(true)
    })

    repository.assertPersistHasBeenCalledWith(expectedUser)
  })

  test('update a new UserBannedDomainEvent', async () => {
    const existignUser = UserMother.random()

    const community = CommunityMother.create({
      id: new Id(existignUser.communityId.valueOf())
    })

    const toModifyUser = UserMother.create({ mainId: existignUser.mainId })

    const userCollection = [toModifyUser]

    repository.returnOnSearch(userCollection)
    queryBus.returnOnQuery(new FindCommunitiesByCriteriaQuery(), new CommunityCollectionResponse([community]))

    repository.returnOnFind(existignUser)

    const event = UserBannedDomainEvent.fromAggregate(existignUser)

    await handler.on(event)

    const expectedUser = UserMother.create({
      ...toModifyUser,
      isBanned: new IsBanned(true)
    })

    const expectedEvent = UserBannedDomainEvent.fromAggregate(expectedUser)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
