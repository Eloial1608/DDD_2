import { UpdateMediaCommandHandler } from '@Media/Media/application/Update/UpdateMediaCommandHandler'
import { Updater } from '@Media/Media/application/Update/Updater'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { MediaRepositoryMock } from '../../__mocks__/MediaRepositoryMock'
import { MediaMother } from '../../domain/MediaMother'
import { UpdateMediaCommandMother } from './UpdateMediaCommandMother'
import { MediaUpdatedDomainEvent } from '@Media/Media/domain/Events/MediaUpdatedDomainEvent'
import { QueryBusMock } from '@Tests/Contexts/Shared/infrastructure/QueryBus/QueryBusMock'
import { UserMother } from '@Tests/Contexts/Media/User/domain/UserMother'
import { UserCollectionResponse } from '@Media/User/application/UserCollectionResponse'
import { MediaNotFound } from '@Media/Media/domain/Errors/MediaNotFound'
import { FindUsersByCriteriaQuery } from '@Media/User/application/FindByCriteria/FindUsersByCriteriaQuery'
import { FindSpaceByIdQuery } from '@Media/Space/application/FindById/FindSpaceByIdQuery'
import { SpaceResponse } from '@Media/Space/application/SpaceResponse'
import { SpaceMother } from '@Tests/Contexts/Media/Space/domain/SpaceMother'

let eventBus: EventBusMock
let repository: MediaRepositoryMock
let queryBus: QueryBusMock
let handler: UpdateMediaCommandHandler
let updater: Updater

describe('UpdateMediaCommandHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new MediaRepositoryMock()
    queryBus = new QueryBusMock()
    updater = new Updater(repository, eventBus, queryBus)
    handler = new UpdateMediaCommandHandler(updater)
  })

  test('Update a media', async () => {
    const user = UserMother.random()

    const media = MediaMother.forAuthor(user)

    const existingMedia = MediaMother.create({
      id: media.id,
      author: media.author,
      userId: media.userId,
      spaceId: media.spaceId,
      communityId: media.communityId
    })

    repository.returnOnFind(existingMedia)

    const space = SpaceMother.create({ communityId: media.communityId })

    queryBus.returnOnQuery(new FindUsersByCriteriaQuery(), new UserCollectionResponse([user]))
    queryBus.returnOnQuery(new FindSpaceByIdQuery(space.id.valueOf()), new SpaceResponse(space))

    const command = UpdateMediaCommandMother.fromAggregate(media)

    await handler.handle(command)

    repository.assertPersistHasBeenCalledWith(media)
  })

  test('Fail if the user doesnt exists', async () => {
    const user = UserMother.random()

    const media = MediaMother.forAuthor(user)

    const space = SpaceMother.create({ communityId: media.communityId })

    queryBus.returnOnQuery(new FindUsersByCriteriaQuery(), new UserCollectionResponse([user]))
    queryBus.returnOnQuery(new FindSpaceByIdQuery(space.id.valueOf()), new SpaceResponse(space))

    const command = UpdateMediaCommandMother.fromAggregate(media)

    expect(handler.handle(command)).rejects.toThrow(MediaNotFound)
  })

  test('Create a new MediaUpdatedDomainEvent', async () => {
    const user = UserMother.random()

    const media = MediaMother.forAuthor(user)

    const existingMedia = MediaMother.create({
      id: media.id,
      author: media.author,
      userId: media.userId,
      spaceId: media.spaceId,
      communityId: media.communityId
    })

    repository.returnOnFind(existingMedia)

    const space = SpaceMother.create({ communityId: media.communityId })

    queryBus.returnOnQuery(new FindUsersByCriteriaQuery(), new UserCollectionResponse([user]))
    queryBus.returnOnQuery(new FindSpaceByIdQuery(space.id.valueOf()), new SpaceResponse(space))

    const command = UpdateMediaCommandMother.fromAggregate(media)

    await handler.handle(command)

    const expectedEvent = MediaUpdatedDomainEvent.fromAggregate(media)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
