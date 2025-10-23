import { UpdateTitleCommandHandler } from '@Core/Title/application/Update/UpdateTitleCommandHandler'
import { Updater } from '@Core/Title/application/Update/Updater'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { TitleRepositoryMock } from '../../__mocks__/TitleRepositoryMock'
import { TitleMother } from '../../domain/TitleMother'
import { UpdateTitleCommandMother } from './UpdateTitleCommandMother'
import { TitleUpdatedDomainEvent } from '@Core/Title/domain/Events/TitleUpdatedDomainEvent'
import { TitleNotFound } from '@Core/Title/domain/Errors/TitleNotFound'

let eventBus: EventBusMock
let repository: TitleRepositoryMock
let handler: UpdateTitleCommandHandler
let updater: Updater

describe('UpdateTitleCommandHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new TitleRepositoryMock()
    updater = new Updater(repository, eventBus)
    handler = new UpdateTitleCommandHandler(updater)
  })

  test('Update a title', async () => {
    const title = TitleMother.random()
    const existingTitle = TitleMother.create({
      id: title.id,
      name: title.name,
      communityId: title.communityId
    })

    repository.returnOnFind(existingTitle)

    const command = UpdateTitleCommandMother.fromAggregate(title)

    await handler.handle(command)

    repository.assertPersistHasBeenCalledWith(title)
  })

  test('Fail if a title doesnt exists', async () => {
    const title = TitleMother.random()
    const command = UpdateTitleCommandMother.fromAggregate(title)

    expect(handler.handle(command)).rejects.toThrow(TitleNotFound)
  })

  test('Update a new TitleUpdatedDomainEvent', async () => {
    const title = TitleMother.random()
    const existingTitle = TitleMother.create({
      id: title.id,
      name: title.name,
      communityId: title.communityId
    })

    repository.returnOnFind(existingTitle)

    const command = UpdateTitleCommandMother.fromAggregate(title)

    await handler.handle(command)

    const expectedEvent = TitleUpdatedDomainEvent.fromAggregate(title)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
