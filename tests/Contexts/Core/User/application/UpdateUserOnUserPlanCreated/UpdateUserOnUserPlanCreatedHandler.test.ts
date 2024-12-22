import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { UserRepositoryMock } from '../../__mocks__/UserRepositoryMock'
import { UpdateUserOnUserPlanCreatedHandler } from '@Core/User/application/UpdateUserOnUserPlanCreated/UpdateUserOnUserPlanCreatedHandler'
import { Updater } from '@Core/User/application/UpdateUserOnUserPlanCreated/Updater'
import { UserMother } from '../../domain/UserMother'
import { UserPlanMother } from '@Tests/Contexts/Core/UserPlan/domain/UserPlanMother'
import { UserPlanCreatedDomainEvent } from '@Core/UserPlan/domain/Events/UserPlanCreatedDomainEvent'
import { HasPayed } from '@Core/User/domain/ValueObjects/HasPayed'
import { UserHasPayedUpdatedDomainEvent } from '@Core/User/domain/Events/UserHasPayedUpdatedDomainEvent'

let repository: UserRepositoryMock
let eventBus: EventBusMock
let handler: UpdateUserOnUserPlanCreatedHandler
let updater: Updater

describe('UpdateUserOnUserPlanCreatedHandler should ', () => {
  beforeEach(() => {
    repository = new UserRepositoryMock()
    eventBus = new EventBusMock()
    updater = new Updater(repository, eventBus)
    handler = new UpdateUserOnUserPlanCreatedHandler(updater)
  })

  test('Update a user', async () => {
    const userPlan = UserPlanMother.random()

    const user = UserMother.create({
      id: userPlan.id
    })

    repository.returnOnFind(user)

    const event = UserPlanCreatedDomainEvent.fromAggregate(userPlan)

    await handler.on(event)

    const expectedUser = UserMother.create({
      ...user,
      hasPayed: new HasPayed(true)
    })

    repository.assertPersistHasBeenCalledWith(expectedUser)
  })

  test('create a new UserHasPayedUpdatedDomainEvent', async () => {
    const userPlan = UserPlanMother.random()

    const user = UserMother.create({
      id: userPlan.id
    })

    repository.returnOnFind(user)

    const event = UserPlanCreatedDomainEvent.fromAggregate(userPlan)

    await handler.on(event)

    const expectedUser = UserMother.create({
      ...user,
      hasPayed: new HasPayed(true)
    })

    const expectedEvent = UserHasPayedUpdatedDomainEvent.fromAggregate(expectedUser)

    eventBus.assertLastPublishedEventIs(expectedEvent)
  })
})
