import { UpdateThemeCommandHandler } from '@Core/Theme/application/Update/UpdateThemeCommandHandler'
import { Updater } from '@Core/Theme/application/Update/Updater'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { ThemeRepositoryMock } from '../../__mocks__/ThemeRepositoryMock'
import { ThemeMother } from '../../domain/ThemeMother'
import { UpdateThemeCommandMother } from './UpdateThemeCommandMother'
import { ThemeUpdatedDomainEvent } from '@Core/Theme/domain/Events/ThemeUpdatedDomainEvent'
let eventBus: EventBusMock
let repository: ThemeRepositoryMock
let handler: UpdateThemeCommandHandler
let updater: Updater

describe('UpdateThemeCommandHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new ThemeRepositoryMock()
    updater = new Updater(repository, eventBus)
    handler = new UpdateThemeCommandHandler(updater)
  })

  test('Update a theme', async () => {
    const theme = ThemeMother.random()

    const existingTheme = ThemeMother.create({
      id: theme.id,
      communityId: theme.communityId,
      colors: theme.colors,
      name: theme.name,
      typography: theme.typography,
      previewPicUrl: theme.previewPicUrl,
      layout: theme.layout
    })

    repository.returnOnFind(existingTheme)

    const command = UpdateThemeCommandMother.fromAggregate(theme)

    await handler.handle(command)

    repository.assertPersistHasBeenCalledWith(theme)
  })

  test('Create a new ThemeUpdatedDomainEvent', async () => {
    const theme = ThemeMother.random()

    const existingTheme = ThemeMother.create({
      id: theme.id,
      communityId: theme.communityId,
      colors: theme.colors,
      name: theme.name,
      typography: theme.typography,
      previewPicUrl: theme.previewPicUrl,
      layout: theme.layout
    })

    repository.returnOnFind(existingTheme)

    const command = UpdateThemeCommandMother.fromAggregate(theme)

    await handler.handle(command)

    const expectedTheme = ThemeUpdatedDomainEvent.fromAggregate(theme)

    eventBus.assertEventHasBeenPublished(expectedTheme)
  })
})
