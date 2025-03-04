import { UpdateMediaOnUserUpdatedHandler } from '@Media/Media/application/UpdateMediaOnUserUpdated/UpdateMediaOnUserUpdatedHandler'
import { Updater } from '@Media/Media/application/UpdateMediaOnUserUpdated/Updater'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { MediaRepositoryMock } from '../../__mocks__/MediaRepositoryMock'
import { MediaMother } from '../../domain/MediaMother'
import { UserMother } from '@Tests/Contexts/Media/User/domain/UserMother'
import { UserCreatedDomainEvent } from '@Media/User/domain/Events/UserCreatedDomainEvent'
import { Author } from '@Media/Media/domain/ValueObjects/Author'
import { MediaAuthorUpdatedDomainEvent } from '@Media/Media/domain/Events/MediaAuthorUpdatedDomainEvent'

let eventBus: EventBusMock
let repository: MediaRepositoryMock
let handler: UpdateMediaOnUserUpdatedHandler
let updater: Updater

describe('UpdateMediaOnUserUpdatedHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new MediaRepositoryMock()
    updater = new Updater(repository, eventBus)
    handler = new UpdateMediaOnUserUpdatedHandler(updater)
  })

  test('Update a media', async () => {
    const media = MediaMother.random()

    const user = UserMother.random()

    const expectedMedia = MediaMother.create({
      ...media,
      author: new Author(
        user.id.valueOf(),
        user.mainId.valueOf(),
        user.name.valueOf(),
        user.username.valueOf(),
        user.pictureUrl?.valueOf(),
        user.bannerUrl?.valueOf()
      )
    })

    repository.returnOnSearch([media])

    const event = UserCreatedDomainEvent.fromAggregate(user)

    await handler.on(event)

    repository.assertPersistHasBeenCalledWith(expectedMedia)
  })

  test('Create a new MediaTotalUsersUpdatedDomainEvent', async () => {
    const media = MediaMother.random()

    const user = UserMother.random()

    repository.returnOnSearch([media])

    const event = UserCreatedDomainEvent.fromAggregate(user)

    await handler.on(event)

    const expectedMedia = MediaMother.create({
      ...media,
      author: new Author(
        user.id.valueOf(),
        user.mainId.valueOf(),
        user.name.valueOf(),
        user.username.valueOf(),
        user.pictureUrl?.valueOf(),
        user.bannerUrl?.valueOf()
      )
    })

    const expectedEvent = MediaAuthorUpdatedDomainEvent.fromAggregate(expectedMedia)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
