import { DeleteTitleCommandHandler } from '@Core/Title/application/Delete/DeleteTitleCommandHandler'
import { Deleter } from '@Core/Title/application/Delete/Deleter'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { TitleRepositoryMock } from '../../__mocks__/TitleRepositoryMock'
import { TitleMother } from '../../domain/TitleMother'
import { DeleteTitleCommandMother } from './DeleteTitleCommandMother'
import { TitleDeletedDomainEvent } from '@Core/Title/domain/Events/TitleDeletedDomainEvent'
import { DeletedAt } from '@Core/Title/domain/ValueObjects/DeletedAt'

let eventBus: EventBusMock
let repository: TitleRepositoryMock
let handler: DeleteTitleCommandHandler
let deleter: Deleter

describe('DeleteTitleCommandHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new TitleRepositoryMock()
    deleter = new Deleter(repository, eventBus)
    handler = new DeleteTitleCommandHandler(deleter)
  })

  test('Delete a new title', async () => {
    const title = TitleMother.create({ deletedAt: new DeletedAt(new Date()) })

    const existing = TitleMother.create({ ...title, deletedAt: undefined })

    repository.returnOnFind(existing)

    const command = DeleteTitleCommandMother.fromAggregate(title)

    await handler.handle(command)

    repository.assertPersistHasBeenCalledWith(title)
  })

  test('Delete a new TitleDeletedDomainEvent', async () => {
    const title = TitleMother.create({ deletedAt: new DeletedAt(new Date()) })

    const existing = TitleMother.create({ ...title, deletedAt: undefined })

    repository.returnOnFind(existing)

    const command = DeleteTitleCommandMother.fromAggregate(title)

    await handler.handle(command)

    const expectedEvent = TitleDeletedDomainEvent.fromAggregate(title)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
