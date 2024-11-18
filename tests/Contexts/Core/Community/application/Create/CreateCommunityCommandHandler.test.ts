import { CreateCommunityCommandHandler } from '@Core/Community/application/Create/CreateCommunityCommandHandler'
import { Creator } from '@Core/Community/application/Create/Creator'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { CommunityRepositoryMock } from '../../__mocks__/CommunityRepositoryMock'
import { CommunityMother } from '../../domain/CommunityMother'
import { CreateCommunityCommandMother } from './CreateCommunityCommandMother'
import { CommunityAlreadyExistsById } from '@Core/Community/domain/Errors/CommunityAlreadyExistsById'
import { CommunityAlreadyExistsBySuffix } from '@Core/Community/domain/Errors/CommunityAlreadyExistsBySuffix'
import { CommunityCreatedDomainEvent } from '@Core/Community/domain/Events/CommunityCreatedDomainEvent'

let eventBus: EventBusMock
let repository: CommunityRepositoryMock
let handler: CreateCommunityCommandHandler
let creator: Creator

describe('CreateCommunityCommandHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new CommunityRepositoryMock()
    creator = new Creator(repository, eventBus)
    handler = new CreateCommunityCommandHandler(creator)
  })

  test('Create a new community', async () => {
    const community = CommunityMother.random()

    const command = CreateCommunityCommandMother.fromAggregate(community)

    await handler.handle(command)

    repository.assertPersistHasBeenCalledWith(community)
  })

  test('Fail if a community with the same id already exists', async () => {
    const community = CommunityMother.random()
    const existingCommunity = CommunityMother.create({ id: community.id })

    const command = CreateCommunityCommandMother.fromAggregate(community)

    repository.returnOnFind(existingCommunity)

    expect(handler.handle(command)).rejects.toThrow(CommunityAlreadyExistsById)
  })

  test('Fail if a community with the same suffix already exists', async () => {
    const community = CommunityMother.random()
    const existingCommunity = CommunityMother.create({ suffix: community.suffix })

    const command = CreateCommunityCommandMother.fromAggregate(community)

    repository.returnOnSearch([existingCommunity])

    expect(handler.handle(command)).rejects.toThrow(CommunityAlreadyExistsBySuffix)
  })

  test('Create a new CommunityCreatedDomainEvent', async () => {
    const community = CommunityMother.random()

    const command = CreateCommunityCommandMother.fromAggregate(community)

    await handler.handle(command)

    const expectedEvent = CommunityCreatedDomainEvent.fromAggregate(community)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
