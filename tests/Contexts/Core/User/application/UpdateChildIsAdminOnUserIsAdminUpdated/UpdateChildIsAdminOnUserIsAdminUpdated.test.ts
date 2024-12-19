import { UpdateChildIsAdminOnUserIsAdminUpdatedHandler } from '@Core/User/application/UpdateChildIsAdminOnUserIsAdminUpdated/UpdateChildIsAdminOnUserIsAdminUpdatedHandler'
import { Updater } from '@Core/User/application/UpdateChildIsAdminOnUserIsAdminUpdated/Updater'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { UserRepositoryMock } from '../../__mocks__/UserRepositoryMock'
import { UserMother } from '../../domain/UserMother'
import { UserUpdatedIsAdminDomainEvent } from '@Core/User/domain/Events/UserUpdatedIsAdminEvent'
import { IsAdmin } from '@Core/User/domain/ValueObjects/IsAdmin'
import { QueryBusMock } from '@Tests/Contexts/Shared/infrastructure/QueryBus/QueryBusMock'
import { CommunityMother } from '@Tests/Contexts/Core/Community/domain/CommunityMother'
import { Id } from '@Core/Community/domain/ValueObjects/Id'
import { FindCommunitiesByCriteriaQuery } from '@Core/Community/application/FindByCriteria/FindCommunitiesByCriteriaQuery'
import { CommunityCollectionResponse } from '@Core/Community/application/CommunityCollectionResponse'

let eventBus: EventBusMock
let repository: UserRepositoryMock
let queryBus: QueryBusMock
let handler: UpdateChildIsAdminOnUserIsAdminUpdatedHandler
let updater: Updater

describe('UpdateChildIsAdminOnUserIsAdminUpdatedHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new UserRepositoryMock()
    queryBus = new QueryBusMock()
    updater = new Updater(repository, eventBus, queryBus)
    handler = new UpdateChildIsAdminOnUserIsAdminUpdatedHandler(updater)
  })

  test('update IsAdmin value', async () => {
    const existignUser = UserMother.create({
      isAdmin: new IsAdmin(true)
    })

    const community = CommunityMother.create({
      id: new Id(existignUser.communityId.valueOf())
    })

    const toModifyUser = UserMother.create({ mainId: existignUser.mainId })

    const userCollection = [toModifyUser]

    repository.returnOnSearch(userCollection)
    queryBus.returnOnQuery(new FindCommunitiesByCriteriaQuery(), new CommunityCollectionResponse([community]))

    repository.returnOnFind(existignUser)

    const event = UserUpdatedIsAdminDomainEvent.fromAggregate(existignUser)

    await handler.on(event)

    const expectedUser = UserMother.create({
      ...toModifyUser,
      isAdmin: new IsAdmin(true)
    })

    repository.assertPersistHasBeenCalledWith(expectedUser)
  })

  test('update a new UserUpdatedIsAdminDomainEvent', async () => {
    const existignUser = UserMother.create({
      isAdmin: new IsAdmin(true)
    })

    const community = CommunityMother.create({
      id: new Id(existignUser.communityId.valueOf())
    })

    const toModifyUser = UserMother.create({ mainId: existignUser.mainId })

    const userCollection = [toModifyUser]

    repository.returnOnSearch(userCollection)
    queryBus.returnOnQuery(new FindCommunitiesByCriteriaQuery(), new CommunityCollectionResponse([community]))

    repository.returnOnFind(existignUser)

    const event = UserUpdatedIsAdminDomainEvent.fromAggregate(existignUser)

    await handler.on(event)

    const expectedUser = UserMother.create({
      ...toModifyUser,
      isAdmin: new IsAdmin(true)
    })

    const expectedEvent = UserUpdatedIsAdminDomainEvent.fromAggregate(expectedUser)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
