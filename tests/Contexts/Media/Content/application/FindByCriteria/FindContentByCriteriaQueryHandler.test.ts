import { FindContentByCriteriaQueryHandler } from '@Media/Content/application/FindByCriteria/FindContentByCriteriaQueryHandler'
import { FinderByCriteria } from '@Media/Content/application/FindByCriteria/FinderByCriteria'
import { ContentRepositoryMock } from '../../__mocks__/ContentRepositoryMock'
import { ContentMother } from '../../domain/ContentMother'
import { FindContentByCriteriaQuery } from '@Media/Content/application/FindByCriteria/FindContentByCriteriaQuery'
import { ContentCollectionResponse } from '@Media/Content/application/ContentCollectionResponse'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

let repository: ContentRepositoryMock
let finder: FinderByCriteria
let handler: FindContentByCriteriaQueryHandler

describe('FindContentsByCriteriaQueryHandler should', () => {
  beforeEach(() => {
    repository = new ContentRepositoryMock()
    finder = new FinderByCriteria(repository)
    handler = new FindContentByCriteriaQueryHandler(finder)
  })

  test('Return a content collection', async () => {
    const content = ContentMother.random()

    repository.returnOnSearch([content])

    const query = new FindContentByCriteriaQuery()

    const response = await handler.handle(query)

    repository.assertSearchHasBeenCalledWith(new Criteria())
    expect(response).toEqual(new ContentCollectionResponse([content]))
  })
})
