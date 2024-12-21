import { UnbanUserOnParentUserUnbannedHandler } from '@Core/User/application/UnbanUserOnParentUserUnbanned/UnbanUserOnParentUserUnbannedHandler'
import { Updater } from '@Core/User/application/UnbanUserOnParentUserUnbanned/Updater'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { UserRepositoryMock } from '../../__mocks__/UserRepositoryMock'
import { UserMother } from '../../domain/UserMother'
import { QueryBusMock } from '@Tests/Contexts/Shared/infrastructure/QueryBus/QueryBusMock'
import { CommunityMother } from '@Tests/Contexts/Core/Community/domain/CommunityMother'
import { Id } from '@Core/Community/domain/ValueObjects/Id'
import { FindCommunitiesByCriteriaQuery } from '@Core/Community/application/FindByCriteria/FindCommunitiesByCriteriaQuery'
import { CommunityCollectionResponse } from '@Core/Community/application/CommunityCollectionResponse'
import { IsBanned } from '@Core/User/domain/ValueObjects/IsBanned'
import { UserUnbannedDomainEvent } from '@Core/User/domain/Events/UserUnbannedDomainEvent'

let eventBus: EventBusMock
let repository: UserRepositoryMock
let queryBus: QueryBusMock
let handler: UnbanUserOnParentUserUnbannedHandler
let updater: Updater

describe('UnbanUserOnParentUserUnbannedHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new UserRepositoryMock()
    queryBus = new QueryBusMock()
    updater = new Updater(repository, eventBus, queryBus)
    handler = new UnbanUserOnParentUserUnbannedHandler(updater)
  })

  test('update IsAdmin value', async () => {
    const existignUser = UserMother.create({
      isBanned: new IsBanned(false)
    })

    const community = CommunityMother.create({
      id: new Id(existignUser.communityId.valueOf())
    })

    const toModifyUser = UserMother.create({ mainId: existignUser.mainId })

    const userCollection = [toModifyUser]

    repository.returnOnSearch(userCollection)
    queryBus.returnOnQuery(new FindCommunitiesByCriteriaQuery(), new CommunityCollectionResponse([community]))

    repository.returnOnFind(existignUser)

    const event = UserUnbannedDomainEvent.fromAggregate(existignUser)

    await handler.on(event)

    const expectedUser = UserMother.create({
      ...toModifyUser,
      isBanned: new IsBanned(false)
    })

    repository.assertPersistHasBeenCalledWith(expectedUser)
  })

  test('create a new UserUnbannedDomainEvent', async () => {
    const existignUser = UserMother.create({
      isBanned: new IsBanned(false)
    })

    const community = CommunityMother.create({
      id: new Id(existignUser.communityId.valueOf())
    })

    const toModifyUser = UserMother.create({ mainId: existignUser.mainId })

    const userCollection = [toModifyUser]

    repository.returnOnSearch(userCollection)
    queryBus.returnOnQuery(new FindCommunitiesByCriteriaQuery(), new CommunityCollectionResponse([community]))

    repository.returnOnFind(existignUser)

    const event = UserUnbannedDomainEvent.fromAggregate(existignUser)

    await handler.on(event)

    const expectedUser = UserMother.create({
      ...toModifyUser,
      isBanned: new IsBanned(false)
    })

    const expectedEvent = UserUnbannedDomainEvent.fromAggregate(expectedUser)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
