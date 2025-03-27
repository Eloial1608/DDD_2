import { UpdateEventOnUserUpdatedHandler } from '@Events/Event/application/UpdateEventOnUserUpdated/UpdateEventOnUserUpdatedHandler'
import { Updater } from '@Events/Event/application/UpdateEventOnUserUpdated/Updater'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { EventRepositoryMock } from '../../__mocks__/EventRepositoryMock'
import { EventMother } from '../../domain/EventMother'
import { UserMother } from '@Tests/Contexts/Events/User/domain/UserMother'
import { UserCreatedDomainEvent } from '@Events/User/domain/Events/UserCreatedDomainEvent'
import { Author } from '@Events/Event/domain/ValueObjects/Author'
import { EventAuthorUpdatedDomainEvent } from '@Events/Event/domain/Events/EventAuthorUpdatedDomainEvent'

let eventBus: EventBusMock
let repository: EventRepositoryMock
let handler: UpdateEventOnUserUpdatedHandler
let updater: Updater

describe('UpdateEventOnUserUpdatedHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new EventRepositoryMock()
    updater = new Updater(repository, eventBus)
    handler = new UpdateEventOnUserUpdatedHandler(updater)
  })

  test('Update a event', async () => {
    const event = EventMother.random()

    const user = UserMother.random()

    const expectedEvent = EventMother.create({
      ...event,
      author: new Author(
        user.id.valueOf(),
        user.mainId.valueOf(),
        user.name.valueOf(),
        user.username.valueOf(),
        user.pictureUrl?.valueOf(),
        user.bannerUrl?.valueOf()
      )
    })

    repository.returnOnSearch([event])

    const devent = UserCreatedDomainEvent.fromAggregate(user)

    await handler.on(devent)

    repository.assertPersistHasBeenCalledWith(expectedEvent)
  })

  test('Create a new EventTotalUsersUpdatedDomainEvent', async () => {
    const event = EventMother.random()

    const user = UserMother.random()

    repository.returnOnSearch([event])

    const devent = UserCreatedDomainEvent.fromAggregate(user)

    await handler.on(devent)

    const expectedEvent = EventMother.create({
      ...event,
      author: new Author(
        user.id.valueOf(),
        user.mainId.valueOf(),
        user.name.valueOf(),
        user.username.valueOf(),
        user.pictureUrl?.valueOf(),
        user.bannerUrl?.valueOf()
      )
    })

    const expecteddEvent = EventAuthorUpdatedDomainEvent.fromAggregate(expectedEvent)

    eventBus.assertEventHasBeenPublished(expecteddEvent)
  })
})
