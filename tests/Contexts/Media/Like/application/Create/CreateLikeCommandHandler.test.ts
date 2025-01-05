import { Creator } from '@Media/Like/application/Create/Creator'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { LikeRepositoryMock } from '../../__mocks__/LikeRepositoryMock'
import { LikeMother } from '../../domain/LikeMother'
import { CreateLikeCommandMother } from './CreateLikeCommandMother'
import { LikeCreatedDomainEvent } from '@Media/Like/domain/Events/LikeCreatedDomainEvent'
import { QueryBusMock } from '@Tests/Contexts/Shared/infrastructure/QueryBus/QueryBusMock'
import { SpaceMother } from '@Tests/Contexts/Media/Space/domain/SpaceMother'
import { FindSpaceByIdQuery } from '@Media/Space/application/FindById/FindSpaceByIdQuery'
import { SpaceResponse } from '@Media/Space/application/SpaceResponse'
import { MediaMother } from '@Tests/Contexts/Media/Media/domain/MediaMother'
import { FindMediaByIdQuery } from '@Media/Media/application/FindById/FindMediaByIdQuery'
import { MediaResponse } from '@Media/Media/application/MediaResponse'
import { CreateLikeCommandHandler } from '@Media/Like/application/Create/CreateLikeCommandHandler'
import { MediaConfiguration } from '@Shared/domain/SharedValueObjects/Space/Configuration/MediaConfiguration'

let eventBus: EventBusMock
let repository: LikeRepositoryMock
let queryBus: QueryBusMock
let handler: CreateLikeCommandHandler
let creator: Creator

describe('CreateLikeCommandHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new LikeRepositoryMock()
    queryBus = new QueryBusMock()
    creator = new Creator(repository, queryBus, eventBus)
    handler = new CreateLikeCommandHandler(creator)
  })

  test('Create a new like', async () => {
    const media = MediaMother.random()
    const space = SpaceMother.create({ id: media.spaceId, configuration: new MediaConfiguration({ allowsLikes: true }) })

    const like = LikeMother.create({ mediaId: media.id })

    queryBus.returnOnQuery(new FindMediaByIdQuery(media.id.valueOf()), new MediaResponse(media))
    queryBus.returnOnQuery(new FindSpaceByIdQuery(space.id.valueOf()), new SpaceResponse(space))

    const command = CreateLikeCommandMother.fromAggregate(like)

    await handler.handle(command)

    repository.assertPersistHasBeenCalledWith(like)
  })

  test('Create a new LikeCreatedDomainEvent', async () => {
    const media = MediaMother.random()
    const space = SpaceMother.create({ id: media.spaceId, configuration: new MediaConfiguration({ allowsLikes: true }) })

    const like = LikeMother.create({ mediaId: media.id })

    queryBus.returnOnQuery(new FindMediaByIdQuery(media.id.valueOf()), new MediaResponse(media))
    queryBus.returnOnQuery(new FindSpaceByIdQuery(space.id.valueOf()), new SpaceResponse(space))

    const command = CreateLikeCommandMother.fromAggregate(like)

    await handler.handle(command)

    const expectedEvent = LikeCreatedDomainEvent.fromAggregate(like)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
