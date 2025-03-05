import { UpdateContentCommandHandler } from '@Media/Content/application/Update/UpdateContentCommandHandler'
import { Updater } from '@Media/Content/application/Update/Updater'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { ContentRepositoryMock } from '../../__mocks__/ContentRepositoryMock'
import { ContentMother } from '../../domain/ContentMother'
import { UpdateContentCommandMother } from './UpdateContentCommandMother'
import { ContentUpdatedDomainEvent } from '@Media/Content/domain/Events/ContentUpdatedDomainEvent'
import { QueryBusMock } from '@Tests/Contexts/Shared/infrastructure/QueryBus/QueryBusMock'
import { ContentNotFound } from '@Media/Content/domain/Errors/ContentNotFound'
import { FindMediaByCriteriaQuery } from '@Media/Media/application/FindByCriteria/FindMediaByCriteriaQuery'
import { MediaCollectionResponse } from '@Media/Media/application/MediaCollectionResponse'
import { MediaMother } from '@Tests/Contexts/Media/Media/domain/MediaMother'

let eventBus: EventBusMock
let repository: ContentRepositoryMock
let queryBus: QueryBusMock
let handler: UpdateContentCommandHandler
let updater: Updater

describe('UpdateContentCommandHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new ContentRepositoryMock()
    queryBus = new QueryBusMock()
    updater = new Updater(repository, eventBus, queryBus)
    handler = new UpdateContentCommandHandler(updater)
  })

  test('Update a content', async () => {
    const content = ContentMother.random()

    const existingContent = ContentMother.create({
      id: content.id,
      mediaId: content.mediaId,
      communityId: content.communityId
    })

    repository.returnOnFind(existingContent)

    const media = MediaMother.create({ id: existingContent.id })

    queryBus.returnOnQuery(new FindMediaByCriteriaQuery(), new MediaCollectionResponse([media]))

    const command = UpdateContentCommandMother.fromAggregate(content)

    await handler.handle(command)

    repository.assertPersistHasBeenCalledWith(content)
  })

  test('Fail if the user doesnt exists', async () => {
    const content = ContentMother.random()

    const existingContent = ContentMother.create({
      id: content.id,
      mediaId: content.mediaId,
      communityId: content.communityId
    })

    const media = MediaMother.create({ id: existingContent.id })

    queryBus.returnOnQuery(new FindMediaByCriteriaQuery(), new MediaCollectionResponse([media]))

    const command = UpdateContentCommandMother.fromAggregate(content)

    expect(handler.handle(command)).rejects.toThrow(ContentNotFound)
  })

  test('Create a new ContentUpdatedDomainEvent', async () => {
    const content = ContentMother.random()

    const existingContent = ContentMother.create({
      id: content.id,
      mediaId: content.mediaId,
      communityId: content.communityId
    })

    repository.returnOnFind(existingContent)

    const media = MediaMother.create({ id: existingContent.id })

    queryBus.returnOnQuery(new FindMediaByCriteriaQuery(), new MediaCollectionResponse([media]))

    const command = UpdateContentCommandMother.fromAggregate(content)

    await handler.handle(command)

    const expectedEvent = ContentUpdatedDomainEvent.fromAggregate(content)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
