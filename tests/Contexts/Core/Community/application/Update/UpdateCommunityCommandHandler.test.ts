import { UpdateCommunityCommandHandler } from '@Core/Community/application/Update/UpdateCommunityCommandHandler'
import { Updater } from '@Core/Community/application/Update/Updater'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { CommunityRepositoryMock } from '../../__mocks__/CommunityRepositoryMock'
import { CommunityMother } from '../../domain/CommunityMother'
import { UpdateCommunityCommandMother } from './UpdateCommunityCommandMother'
import { CommunityAlreadyExistsBySuffix } from '@Core/Community/domain/Errors/CommunityAlreadyExistsBySuffix'
import { CommunityUpdatedDomainEvent } from '@Core/Community/domain/Events/CommunityUpdatedDomainEvent'
import { CommunityNotFound } from '@Core/Community/domain/Errors/CommunityNotFound'
import { CommunityAlreadyExistsByDomain } from '@Core/Community/domain/Errors/CommunityAlreadyExistsByDomain'
import { Domain } from '@Core/Community/domain/ValueObjects/Domain'
import { MotherCreator } from '@Tests/Contexts/Shared/domain/MotherCreator'

let eventBus: EventBusMock
let repository: CommunityRepositoryMock
let handler: UpdateCommunityCommandHandler
let updater: Updater

describe('UpdateCommunityCommandHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new CommunityRepositoryMock()
    updater = new Updater(repository, eventBus)
    handler = new UpdateCommunityCommandHandler(updater)
  })

  test('Update a community', async () => {
    const community = CommunityMother.random()

    const command = UpdateCommunityCommandMother.fromAggregate(community)

    repository.returnOnFind(community)

    await handler.handle(command)

    repository.assertPersistHasBeenCalledWith(community)
  })

  test('Fail if a community with the same domain already exists', async () => {
    const community = CommunityMother.create({ domain: new Domain(MotherCreator.random().internet.url()) })
    const existingCommunity = CommunityMother.create({ domain: community.domain })

    const command = UpdateCommunityCommandMother.fromAggregate(community)

    repository.returnOnFind(existingCommunity)

    repository.returnOnSearch([existingCommunity])

    expect(handler.handle(command)).rejects.toThrow(CommunityAlreadyExistsByDomain)
  })

  test('Fail if a community with the same suffix already exists', async () => {
    const community = CommunityMother.random()
    const existingCommunity = CommunityMother.create({ suffix: community.suffix })

    const command = UpdateCommunityCommandMother.fromAggregate(community)

    repository.returnOnFind(existingCommunity)

    repository.returnOnSearch([existingCommunity])

    expect(handler.handle(command)).rejects.toThrow(CommunityAlreadyExistsBySuffix)
  })

  test('Fail if a community doesnt exists', async () => {
    const community = CommunityMother.random()

    const command = UpdateCommunityCommandMother.fromAggregate(community)

    expect(handler.handle(command)).rejects.toThrow(CommunityNotFound)
  })

  test('Create a new CommunityUpdatedDomainEvent', async () => {
    const community = CommunityMother.random()

    const command = UpdateCommunityCommandMother.fromAggregate(community)

    repository.returnOnFind(community)

    await handler.handle(command)

    const expectedEvent = CommunityUpdatedDomainEvent.fromAggregate(community)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
