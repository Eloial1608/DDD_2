import { FindThemeByIdQueryHandler } from '@Core/Theme/application/FindById/FindThemeByIdQueryHandler'
import { FinderById } from '@Core/Theme/application/FindById/FinderById'
import { ThemeRepositoryMock } from '../../__mocks__/ThemeRepositoryMock'
import { ThemeMother } from '../../domain/ThemeMother'
import { FindThemeByIdQuery } from '@Core/Theme/application/FindById/FindThemeByIdQuery'
import { ThemeResponse } from '@Core/Theme/application/ThemeResponse'
import { ThemeNotFound } from '@Core/Theme/domain/Errors/ThemeNotFound'

let repository: ThemeRepositoryMock
let finder: FinderById
let handler: FindThemeByIdQueryHandler

describe('FindThemeByIdQueryHandler should', () => {
  beforeEach(() => {
    repository = new ThemeRepositoryMock()
    finder = new FinderById(repository)
    handler = new FindThemeByIdQueryHandler(finder)
  })

  test('Return a theme', async () => {
    const theme = ThemeMother.random()

    repository.returnOnFind(theme)

    const query = new FindThemeByIdQuery(theme.id.valueOf())

    const response = await handler.handle(query)

    repository.assertFindHasBeenCalledWith(theme.id)
    expect(response).toEqual(new ThemeResponse(theme))
  })

  test('Fail if a theme doesnt exists', async () => {
    const theme = ThemeMother.random()

    const query = new FindThemeByIdQuery(theme.id.valueOf())

    expect(handler.handle(query)).rejects.toThrowError(ThemeNotFound)
  })
})
