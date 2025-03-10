import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { SectionRepositoryMock } from '../../__mocks__/SectionRepositoryMock'
import { Deleter } from '@Course/Section/application/Delete/Deleter'
import { DeleteSectionCommandHandler } from '@Course/Section/application/Delete/DeleteSectionCommandHandler'
import { SectionMother } from '../../domain/SectionMother'
import { DeletedAt } from '@Course/Section/domain/ValueObjects/DeletedAt'
import { DeleteSectionCommandMother } from './DeleteSectionCommandMother'
import { SectionDeletedDomainEvent } from '@Course/Section/domain/events/SectionDeletedDomainEvent'

let eventBus: EventBusMock
let repository: SectionRepositoryMock
let handler: DeleteSectionCommandHandler
let deleter: Deleter

describe('DeleteSectionCommandHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new SectionRepositoryMock()
    deleter = new Deleter(repository, eventBus)
    handler = new DeleteSectionCommandHandler(deleter)
  })

  test('Delete a section', async () => {
    const section = SectionMother.create({ deletedAt: new DeletedAt(new Date()) })

    const existing = SectionMother.create({ ...section, deletedAt: undefined })

    repository.returnOnFind(existing)

    const command = DeleteSectionCommandMother.fromAggregate(section)

    await handler.handle(command)

    repository.assertPersistHasBeenCalledWith(section)
  })

  test('Create a new SectionDeletedDomainEvent', async () => {
    const section = SectionMother.create({ deletedAt: new DeletedAt(new Date()) })

    const existing = SectionMother.create({ ...section, deletedAt: undefined })

    repository.returnOnFind(existing)

    const command = DeleteSectionCommandMother.fromAggregate(section)

    await handler.handle(command)

    const expectedEvent = SectionDeletedDomainEvent.fromAggregate(section)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
