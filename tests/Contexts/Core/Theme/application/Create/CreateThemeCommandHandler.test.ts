import { CreateThemeCommandHandler } from '@Core/Theme/application/Create/CreateThemeCommandHandler'
import { Creator } from '@Core/Theme/application/Create/Creator'
import ThemeBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { ThemeRepositoryMock } from '../../__mocks__/ThemeRepositoryMock'
import { ThemeMother } from '../../domain/ThemeMother'
import { CreateThemeCommandMother } from './CreateThemeCommandMother'
import { ThemeCreatedDomainEvent } from '@Core/Theme/domain/Events/ThemeCreatedDomainEvent'

let themeBus: ThemeBusMock
let repository: ThemeRepositoryMock
let handler: CreateThemeCommandHandler
let creator: Creator

describe('CreateThemeCommandHandler should ', () => {
  beforeEach(() => {
    themeBus = new ThemeBusMock()
    repository = new ThemeRepositoryMock()
    creator = new Creator(repository, themeBus)
    handler = new CreateThemeCommandHandler(creator)
  })

  test('Create a new theme', async () => {
    const theme = ThemeMother.random()

    const command = CreateThemeCommandMother.fromAggregate(theme)

    await handler.handle(command)

    repository.assertPersistHasBeenCalledWith(theme)
  })

  test('Fail if a theme with the same id already exists', async () => {
    const theme = ThemeMother.random()

    const existingTheme = ThemeMother.create({ id: theme.id })

    const command = CreateThemeCommandMother.fromAggregate(theme)

    repository.returnOnFind(existingTheme)

    await handler.handle(command)

    repository.assertPersistHasNotBeenCalled()
  })

  test('Create a new ThemeCreatedDomainEvent', async () => {
    const theme = ThemeMother.random()

    const command = CreateThemeCommandMother.fromAggregate(theme)

    await handler.handle(command)

    const expectedTheme = ThemeCreatedDomainEvent.fromAggregate(theme)

    themeBus.assertEventHasBeenPublished(expectedTheme)
  })
})
