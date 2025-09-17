import { DeleteThemeCommandHandler } from '@Core/Theme/application/Delete/DeleteThemeCommandHandler'
import { Deleter } from '@Core/Theme/application/Delete/Deleter'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { ThemeRepositoryMock } from '../../__mocks__/ThemeRepositoryMock'
import { ThemeMother } from '../../domain/ThemeMother'
import { DeleteThemeCommandMother } from './DeleteThemeCommandMother'
import { ThemeDeletedDomainEvent } from '@Core/Theme/domain/Events/ThemeDeletedDomainEvent'
import { DeletedAt } from '@Core/Theme/domain/ValueObjects/DeletedAt'

let eventBus: EventBusMock
let repository: ThemeRepositoryMock
let handler: DeleteThemeCommandHandler
let deleter: Deleter

describe('DeleteEventCommandHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new ThemeRepositoryMock()
    deleter = new Deleter(repository, eventBus)
    handler = new DeleteThemeCommandHandler(deleter)
  })

  test('Delete a Theme', async () => {
    const theme = ThemeMother.create({ deletedAt: new DeletedAt(new Date()) })

    const existing = ThemeMother.create({ ...theme, deletedAt: undefined })

    repository.returnOnFind(existing)

    const command = DeleteThemeCommandMother.fromAggregate(theme)

    await handler.handle(command)

    repository.assertPersistHasBeenCalledWith(theme)
  })

  test('Create a new ThemeDeletedDomainEvent', async () => {
    const theme = ThemeMother.create({ deletedAt: new DeletedAt(new Date()) })

    const existing = ThemeMother.create({ ...theme, deletedAt: undefined })

    repository.returnOnFind(existing)

    const command = DeleteThemeCommandMother.fromAggregate(theme)

    await handler.handle(command)

    const expectedEvent = ThemeDeletedDomainEvent.fromAggregate(theme)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
