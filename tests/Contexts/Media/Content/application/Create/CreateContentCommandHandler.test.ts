import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { QueryBusMock } from '@Tests/Contexts/Shared/infrastructure/QueryBus/QueryBusMock'
import { ContentRepositoryMock } from '../../__mocks__/ContentRepositoryMock'
import { CreateContentCommandHandler } from '@Media/Content/application/Create/CreateContentCommandHandler'
import { Creator } from '@Media/Content/application/Create/Creator'
import { ContentMother } from '../../domain/ContentMother'
import { CreateContentCommandMother } from './CreateContentCommandMother'
import { ContentCreatedDomainEvent } from '@Media/Content/domain/Events/ContentCreatedDomainEvent'
import { MediaMother } from '@Tests/Contexts/Media/Media/domain/MediaMother'
import { FindMediaByCriteriaQuery } from '@Media/Media/application/FindByCriteria/FindMediaByCriteriaQuery'
import { MediaCollectionResponse } from '@Media/Media/application/MediaCollectionResponse'

let eventBus: EventBusMock
let repository: ContentRepositoryMock
let queryBus: QueryBusMock
let handler: CreateContentCommandHandler
let creator: Creator

describe('CreateMediaCommandHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new ContentRepositoryMock()
    queryBus = new QueryBusMock()
    creator = new Creator(repository, eventBus, queryBus)
    handler = new CreateContentCommandHandler(creator)
  })

  test('Create a new content', async () => {
    const content = ContentMother.random()

    const media = MediaMother.create({ id: content.mediaId })

    queryBus.returnOnQuery(new FindMediaByCriteriaQuery(), new MediaCollectionResponse([media]))

    const command = CreateContentCommandMother.fromAggregate(content)

    await handler.handle(command)

    repository.assertPersistHasBeenCalledWith(content)
  })

  test('Fail if a content with the same id already exists', async () => {
    const content = ContentMother.random()

    const media = MediaMother.create({ id: content.mediaId })

    queryBus.returnOnQuery(new FindMediaByCriteriaQuery(), new MediaCollectionResponse([media]))

    const command = CreateContentCommandMother.fromAggregate(content)

    repository.returnOnFind(content)

    await handler.handle(command)

    repository.assertPersistHasNotBeenCalled()
  })

  test('Create a new ContentCreatedDomainEvent', async () => {
    const content = ContentMother.random()

    const media = MediaMother.create({ id: content.mediaId })

    queryBus.returnOnQuery(new FindMediaByCriteriaQuery(), new MediaCollectionResponse([media]))

    const command = CreateContentCommandMother.fromAggregate(content)

    await handler.handle(command)

    const expectedEvent = ContentCreatedDomainEvent.fromAggregate(content)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
