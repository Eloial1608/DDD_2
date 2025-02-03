import { UpdateHasFormOnFormDeletedHandler } from '@Core/Community/application/UpdateHasFormOnFormDeleted/UpdateHasFormOnFormDeletedHandler'
import { Updater } from '@Core/Community/application/UpdateHasFormOnFormDeleted/Updater'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { CommunityRepositoryMock } from '../../__mocks__/CommunityRepositoryMock'
import { CommunityMother } from '@Tests/Contexts/Core/Community/domain/CommunityMother'
import { FormDeletedDomainEvent } from '@Core/Form/domain/Events/FormDeletedDomainEvent'
import { FormMother } from '@Tests/Contexts/Core/Form/domain/FormMother'
import { CommunityHasFormUpdatedDomainEvent } from '@Core/Community/domain/Events/CommunityHasFormUpdatedDomainEvent'

let eventBus: EventBusMock
let repository: CommunityRepositoryMock
let handler: UpdateHasFormOnFormDeletedHandler
let updater: Updater

describe('UpdateHasFormOnFormDeletedHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new CommunityRepositoryMock()
    updater = new Updater(repository, eventBus)
    handler = new UpdateHasFormOnFormDeletedHandler(updater)
  })

  test('Update community', async () => {
    const existingCommunity = CommunityMother.random()

    repository.returnOnFind(existingCommunity)

    const form = FormMother.create({
      communityId: existingCommunity.id
    })

    const event = FormDeletedDomainEvent.fromAggregate(form)

    await handler.on(event)

    const expectedCommunity = CommunityMother.create({
      ...existingCommunity
    })

    repository.assertPersistHasBeenCalledWith(expectedCommunity)
  })

  test('create a new CommunityHasFormUpdatedDomainEvent', async () => {
    const existingCommunity = CommunityMother.random()

    repository.returnOnFind(existingCommunity)

    const form = FormMother.create({
      communityId: existingCommunity.id
    })

    const event = FormDeletedDomainEvent.fromAggregate(form)

    await handler.on(event)

    const expectedCommunity = CommunityMother.create({
      ...existingCommunity
    })

    const expectedEvent = CommunityHasFormUpdatedDomainEvent.fromAggregate(expectedCommunity)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
