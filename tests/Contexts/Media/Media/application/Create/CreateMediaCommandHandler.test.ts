import { CreateMediaCommandHandler } from '@Media/Media/application/Create/CreateMediaCommandHandler'
import { Creator } from '@Media/Media/application/Create/Creator'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { MediaRepositoryMock } from '../../__mocks__/MediaRepositoryMock'
import { MediaMother } from '../../domain/MediaMother'
import { CreateMediaCommandMother } from './CreateMediaCommandMother'
import { MediaCreatedDomainEvent } from '@Media/Media/domain/Events/MediaCreatedDomainEvent'
import { QueryBusMock } from '@Tests/Contexts/Shared/infrastructure/QueryBus/QueryBusMock'
import { UserMother } from '@Tests/Contexts/Media/User/domain/UserMother'
import { UserCollectionResponse } from '@Media/User/application/UserCollectionResponse'
import { SpaceMother } from '@Tests/Contexts/Media/Space/domain/SpaceMother'
import { FindUsersByCriteriaQuery } from '@Media/User/application/FindByCriteria/FindUsersByCriteriaQuery'
import { FindSpaceByIdQuery } from '@Media/Space/application/FindById/FindSpaceByIdQuery'
import { SpaceResponse } from '@Media/Space/application/SpaceResponse'

let eventBus: EventBusMock
let repository: MediaRepositoryMock
let queryBus: QueryBusMock
let handler: CreateMediaCommandHandler
let creator: Creator

describe('CreateMediaCommandHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new MediaRepositoryMock()
    queryBus = new QueryBusMock()
    creator = new Creator(repository, eventBus, queryBus)
    handler = new CreateMediaCommandHandler(creator)
  })

  test('Create a new media', async () => {
    const user = UserMother.random()

    const media = MediaMother.forAuthor(user)

    const space = SpaceMother.create({ communityId: media.communityId })

    queryBus.returnOnQuery(new FindUsersByCriteriaQuery(), new UserCollectionResponse([user]))
    queryBus.returnOnQuery(new FindSpaceByIdQuery(space.id.valueOf()), new SpaceResponse(space))

    const command = CreateMediaCommandMother.fromAggregate(media)

    await handler.handle(command)

    repository.assertPersistHasBeenCalledWith(media)
  })

  test('Fail if a media with the same id already exists', async () => {
    const user = UserMother.random()

    const media = MediaMother.forAuthor(user)

    const existingMedia = MediaMother.create({ id: media.id })

    const space = SpaceMother.create({ communityId: media.communityId })

    queryBus.returnOnQuery(new FindUsersByCriteriaQuery(), new UserCollectionResponse([user]))
    queryBus.returnOnQuery(new FindSpaceByIdQuery(space.id.valueOf()), new SpaceResponse(space))

    const command = CreateMediaCommandMother.fromAggregate(media)

    repository.returnOnFind(existingMedia)

    await handler.handle(command)

    repository.assertPersistHasNotBeenCalled()
  })

  test('Create a new MediaCreatedDomainEvent', async () => {
    const user = UserMother.random()

    const media = MediaMother.forAuthor(user)

    const space = SpaceMother.create({ communityId: media.communityId })

    queryBus.returnOnQuery(new FindUsersByCriteriaQuery(), new UserCollectionResponse([user]))
    queryBus.returnOnQuery(new FindSpaceByIdQuery(space.id.valueOf()), new SpaceResponse(space))

    const command = CreateMediaCommandMother.fromAggregate(media)

    await handler.handle(command)

    const expectedEvent = MediaCreatedDomainEvent.fromAggregate(media)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
