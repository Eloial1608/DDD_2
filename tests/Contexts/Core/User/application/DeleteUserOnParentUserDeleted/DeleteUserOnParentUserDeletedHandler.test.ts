import { DeleteUserOnParentUserDeletedHandler } from '@Core/User/application/DeleteUserOnParentUserDeleted/DeleteUserOnParentUserDeletedHandler'
import { Deleter } from '@Core/User/application/DeleteUserOnParentUserDeleted/Deleter'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { UserRepositoryMock } from '../../__mocks__/UserRepositoryMock'
import { UserMother } from '../../domain/UserMother'
import { UserDeletedDomainEvent } from '@Core/User/domain/Events/UserDeletedDomainEvent'
import { QueryBusMock } from '@Tests/Contexts/Shared/infrastructure/QueryBus/QueryBusMock'
import { CommunityMother } from '@Tests/Contexts/Core/Community/domain/CommunityMother'
import { Id } from '@Core/Community/domain/ValueObjects/Id'
import { FindCommunitiesByCriteriaQuery } from '@Core/Community/application/FindByCriteria/FindCommunitiesByCriteriaQuery'
import { CommunityCollectionResponse } from '@Core/Community/application/CommunityCollectionResponse'
import { DeletedAt } from '@Core/User/domain/ValueObjects/DeletedAt'

let eventBus: EventBusMock
let repository: UserRepositoryMock
let queryBus: QueryBusMock
let handler: DeleteUserOnParentUserDeletedHandler
let deleter: Deleter

describe('DeleteUserOnParentUserDeletedHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new UserRepositoryMock()
    queryBus = new QueryBusMock()
    deleter = new Deleter(repository, eventBus, queryBus)
    handler = new DeleteUserOnParentUserDeletedHandler(deleter)
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

    const event = UserDeletedDomainEvent.fromAggregate(existignUser)

    await handler.on(event)

    const expectedUser = UserMother.create({
      ...toModifyUser,
      deletedAt: new DeletedAt(new Date())
    })

    repository.assertPersistHasBeenCalledWith(expectedUser)
  })

  test('update a new UserDeletedDomainEvent', async () => {
    const existignUser = UserMother.random()

    const community = CommunityMother.create({
      id: new Id(existignUser.communityId.valueOf())
    })

    const toModifyUser = UserMother.create({ mainId: existignUser.mainId })

    const userCollection = [toModifyUser]

    repository.returnOnSearch(userCollection)
    queryBus.returnOnQuery(new FindCommunitiesByCriteriaQuery(), new CommunityCollectionResponse([community]))

    repository.returnOnFind(existignUser)

    const event = UserDeletedDomainEvent.fromAggregate(existignUser)

    await handler.on(event)

    const expectedUser = UserMother.create({
      ...toModifyUser,
      deletedAt: new DeletedAt(new Date())
    })

    const expectedEvent = UserDeletedDomainEvent.fromAggregate(expectedUser)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
