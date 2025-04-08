import { DeleteSpaceMemberOnSpaceMemberDeletedHandler } from '@Chat/SpaceMember/application/DeleteSpaceMemberOnSpaceMemberDeleted/DeleteSpaceMemberOnSpaceMemberDeletedHandler'
import { Deleter } from '@Chat/SpaceMember/application/DeleteSpaceMemberOnSpaceMemberDeleted/Deleter'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { SpaceMemberRepositoryMock } from '../../__mocks__/SpaceMemberRepositoryMock'
import { SpaceMemberMother } from '../../domain/SpaceMemberMother'
import { SpaceMemberMother as CoreSpaceMemberMother } from '@Tests/Contexts/Core/SpaceMember/domain/SpaceMemberMother'
import { SpaceMemberDeletedDomainEvent as CoreSpaceMemberDeletedDomainEvent } from '@Core/SpaceMember/domain/Events/SpaceMemberDeletedDomainEvent'
import { DeletedAt } from '@Core/SpaceMember/domain/ValueObjects/DeletedAt'
import { SpaceMemberDeletedDomainEvent } from '@Chat/SpaceMember/domain/Events/SpaceMemberDeletedDomainEvent'

let eventBus: EventBusMock
let repository: SpaceMemberRepositoryMock
let handler: DeleteSpaceMemberOnSpaceMemberDeletedHandler
let deleter: Deleter

describe('DeleteSpaceMemberOnSpaceMemberDeletedHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new SpaceMemberRepositoryMock()
    deleter = new Deleter(repository, eventBus)
    handler = new DeleteSpaceMemberOnSpaceMemberDeletedHandler(deleter)
  })

  test('Create spaceMember', async () => {
    const coreSpaceMember = CoreSpaceMemberMother.create({
      deletedAt: new DeletedAt(new Date())
    })

    const existingSpaceMember = SpaceMemberMother.create({ id: coreSpaceMember.id })

    repository.returnOnFind(existingSpaceMember)

    const event = CoreSpaceMemberDeletedDomainEvent.fromAggregate(coreSpaceMember)

    await handler.on(event)

    repository.assertDeleteHasBeenCalledWith(existingSpaceMember)
  })

  test('Dont do anything if the spaceMember doesnt exists exists', async () => {
    const coreSpaceMember = CoreSpaceMemberMother.create({
      deletedAt: new DeletedAt(new Date())
    })

    const event = CoreSpaceMemberDeletedDomainEvent.fromAggregate(coreSpaceMember)

    await handler.on(event)

    repository.assertDeleteHasNotBeenCalled()
  })

  test('Create a new SpaceMemberDeletedDomainEvent', async () => {
    const coreSpaceMember = CoreSpaceMemberMother.create({
      deletedAt: new DeletedAt(new Date())
    })

    const existingSpaceMember = SpaceMemberMother.create({ id: coreSpaceMember.id })

    repository.returnOnFind(existingSpaceMember)

    const event = CoreSpaceMemberDeletedDomainEvent.fromAggregate(coreSpaceMember)

    await handler.on(event)

    const expectedEvent = SpaceMemberDeletedDomainEvent.fromAggregate(existingSpaceMember)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
