import { CreateTitleCommandHandler } from '@Core/Title/application/Create/CreateTitleCommandHandler'
import { Creator } from '@Core/Title/application/Create/Creator'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { TitleRepositoryMock } from '../../__mocks__/TitleRepositoryMock'
import { TitleMother } from '../../domain/TitleMother'
import { CreateTitleCommandMother } from './CreateTitleCommandMother'
import { TitleAlreadyExistsById } from '@Core/Title/domain/Errors/TitleAlreadyExistsById'
import { TitleCreatedDomainEvent } from '@Core/Title/domain/Events/TitleCreatedDomainEvent'
import { TitleAlreadyExistsByName } from '@Core/Title/domain/Errors/TitleAlreadyExistsByName'

let eventBus: EventBusMock
let repository: TitleRepositoryMock
let handler: CreateTitleCommandHandler
let creator: Creator

describe('CreateTitleCommandHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new TitleRepositoryMock()
    creator = new Creator(repository, eventBus)
    handler = new CreateTitleCommandHandler(creator)
  })

  test('Create a new title', async () => {
    const title = TitleMother.random()

    const command = CreateTitleCommandMother.fromAggregate(title)

    await handler.handle(command)

    repository.assertPersistHasBeenCalledWith(title)
  })

  test('Fail if a title with the same id already exists', async () => {
    const title = TitleMother.random()
    const existingTitle = TitleMother.create({ id: title.id })

    const command = CreateTitleCommandMother.fromAggregate(title)

    repository.returnOnFind(existingTitle)

    expect(handler.handle(command)).rejects.toThrow(TitleAlreadyExistsById)
  })

  test('Fail if a title with the same name already exists', async () => {
    const title = TitleMother.random()
    const existingTitle = TitleMother.create({ name: title.name, communityId: title.communityId })

    const command = CreateTitleCommandMother.fromAggregate(title)

    repository.returnOnSearch([existingTitle])

    expect(handler.handle(command)).rejects.toThrow(TitleAlreadyExistsByName)
  })

  test('Create a new TitleCreatedDomainEvent', async () => {
    const title = TitleMother.random()

    const command = CreateTitleCommandMother.fromAggregate(title)

    await handler.handle(command)

    const expectedEvent = TitleCreatedDomainEvent.fromAggregate(title)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
