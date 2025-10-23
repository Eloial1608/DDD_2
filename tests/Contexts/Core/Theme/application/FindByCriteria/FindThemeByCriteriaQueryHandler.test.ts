import { FindThemesByCriteriaQueryHandler } from '@Core/Theme/application/FindByCriteria/FindThemesByCriteriaQueryHandler'
import { FinderByCriteria } from '@Core/Theme/application/FindByCriteria/FinderByCriteria'
import { ThemeRepositoryMock } from '../../__mocks__/ThemeRepositoryMock'
import { ThemeMother } from '../../domain/ThemeMother'
import { FindThemesByCriteriaQuery } from '@Core/Theme/application/FindByCriteria/FindThemesByCriteriaQuery'
import { ThemeCollectionResponse } from '@Core/Theme/application/ThemeCollectionResponse'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

let repository: ThemeRepositoryMock
let finder: FinderByCriteria
let handler: FindThemesByCriteriaQueryHandler

describe('FindThemeByCriteriaQueryHandler should', () => {
  beforeEach(() => {
    repository = new ThemeRepositoryMock()
    finder = new FinderByCriteria(repository)
    handler = new FindThemesByCriteriaQueryHandler(finder)
  })

  test('Return a theme collection', async () => {
    const theme = ThemeMother.random()

    repository.returnOnSearch([theme])

    const query = new FindThemesByCriteriaQuery()

    const response = await handler.handle(query)

    repository.assertSearchHasBeenCalledWith(new Criteria())
    expect(response).toEqual(new ThemeCollectionResponse([theme]))
  })
})
