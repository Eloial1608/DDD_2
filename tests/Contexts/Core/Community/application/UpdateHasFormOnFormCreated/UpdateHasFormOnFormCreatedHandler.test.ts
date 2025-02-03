import { UpdateHasFormOnFormCreatedHandler } from '@Core/Community/application/UpdateHasFormOnFormCreated/UpdateHasFormOnFormCreatedHandler'
import { Updater } from '@Core/Community/application/UpdateHasFormOnFormCreated/Updater'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { CommunityRepositoryMock } from '../../__mocks__/CommunityRepositoryMock'
import { CommunityMother } from '@Tests/Contexts/Core/Community/domain/CommunityMother'
import { FormCreatedDomainEvent } from '@Core/Form/domain/Events/FormCreatedDomainEvent'
import { FormMother } from '@Tests/Contexts/Core/Form/domain/FormMother'
import { CommunityHasFormUpdatedDomainEvent } from '@Core/Community/domain/Events/CommunityHasFormUpdatedDomainEvent'
import { HasRegisterForm } from '@Core/Community/domain/ValueObjects/HasRegisterForm'

let eventBus: EventBusMock
let repository: CommunityRepositoryMock
let handler: UpdateHasFormOnFormCreatedHandler
let updater: Updater

describe('UpdateHasFormOnFormCreatedHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new CommunityRepositoryMock()
    updater = new Updater(repository, eventBus)
    handler = new UpdateHasFormOnFormCreatedHandler(updater)
  })

  test('Update community', async () => {
    const existingCommunity = CommunityMother.random()

    repository.returnOnFind(existingCommunity)

    const form = FormMother.create({
      communityId: existingCommunity.id
    })

    const event = FormCreatedDomainEvent.fromAggregate(form)

    await handler.on(event)

    const expectedCommunity = CommunityMother.create({
      ...existingCommunity,
      hasRegisterForm: new HasRegisterForm(true),
      registerFormId: form.id
    })

    repository.assertPersistHasBeenCalledWith(expectedCommunity)
  })

  test('create a new CommunityHasFormUpdatedDomainEvent', async () => {
    const existingCommunity = CommunityMother.random()

    repository.returnOnFind(existingCommunity)

    const form = FormMother.create({
      communityId: existingCommunity.id
    })

    const event = FormCreatedDomainEvent.fromAggregate(form)

    await handler.on(event)

    const expectedCommunity = CommunityMother.create({
      ...existingCommunity,
      hasRegisterForm: new HasRegisterForm(true),
      registerFormId: form.id
    })

    const expectedEvent = CommunityHasFormUpdatedDomainEvent.fromAggregate(expectedCommunity)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
