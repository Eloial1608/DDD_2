import { UpdateThreadOnUserUpdatedHandler } from '@Threads/Thread/application/UpdateThreadOnUserUpdated/UpdateThreadOnUserUpdatedHandler'
import { Updater } from '@Threads/Thread/application/UpdateThreadOnUserUpdated/Updater'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { ThreadRepositoryMock } from '../../__mocks__/ThreadRepositoryMock'
import { ThreadMother } from '../../domain/ThreadMother'
import { UserMother } from '@Tests/Contexts/Threads/User/domain/UserMother'
import { UserCreatedDomainEvent } from '@Threads/User/domain/Events/UserCreatedDomainEvent'
import { Author } from '@Threads/Thread/domain/ValueObjects/Author'
import { ThreadAuthorUpdatedDomainEvent } from '@Threads/Thread/domain/Events/ThreadAuthorUpdatedDomainEvent'

let eventBus: EventBusMock
let repository: ThreadRepositoryMock
let handler: UpdateThreadOnUserUpdatedHandler
let updater: Updater

describe('UpdateThreadOnUserUpdatedHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new ThreadRepositoryMock()
    updater = new Updater(repository, eventBus)
    handler = new UpdateThreadOnUserUpdatedHandler(updater)
  })

  test('Update a thread', async () => {
    const thread = ThreadMother.random()

    const user = UserMother.random()

    const expectedThread = ThreadMother.create({
      ...thread,
      author: new Author(
        user.id.valueOf(),
        user.mainId.valueOf(),
        user.name.valueOf(),
        user.username.valueOf(),
        user.pictureUrl?.valueOf(),
        user.bannerUrl?.valueOf()
      )
    })

    repository.returnOnSearch([thread])

    const event = UserCreatedDomainEvent.fromAggregate(user)

    await handler.on(event)

    repository.assertPersistHasBeenCalledWith(expectedThread)
  })

  test('Create a new ThreadTotalUsersUpdatedDomainEvent', async () => {
    const thread = ThreadMother.random()

    const user = UserMother.random()

    repository.returnOnSearch([thread])

    const event = UserCreatedDomainEvent.fromAggregate(user)

    await handler.on(event)

    const expectedThread = ThreadMother.create({
      ...thread,
      author: new Author(
        user.id.valueOf(),
        user.mainId.valueOf(),
        user.name.valueOf(),
        user.username.valueOf(),
        user.pictureUrl?.valueOf(),
        user.bannerUrl?.valueOf()
      )
    })

    const expectedEvent = ThreadAuthorUpdatedDomainEvent.fromAggregate(expectedThread)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
