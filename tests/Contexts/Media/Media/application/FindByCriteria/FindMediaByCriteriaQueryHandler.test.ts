import { FindMediaByCriteriaQueryHandler } from '@Media/Media/application/FindByCriteria/FindMediaByCriteriaQueryHandler'
import { FinderByCriteria } from '@Media/Media/application/FindByCriteria/FinderByCriteria'
import { MediaRepositoryMock } from '../../__mocks__/MediaRepositoryMock'
import { MediaMother } from '../../domain/MediaMother'
import { FindMediaByCriteriaQuery } from '@Media/Media/application/FindByCriteria/FindMediaByCriteriaQuery'
import { MediaCollectionResponse } from '@Media/Media/application/MediaCollectionResponse'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

let repository: MediaRepositoryMock
let finder: FinderByCriteria
let handler: FindMediaByCriteriaQueryHandler

describe('FindMediaByCriteriaQueryHandler should', () => {
  beforeEach(() => {
    repository = new MediaRepositoryMock()
    finder = new FinderByCriteria(repository)
    handler = new FindMediaByCriteriaQueryHandler(finder)
  })

  test('Return a media collection', async () => {
    const media = MediaMother.random()

    repository.returnOnSearch([media])

    const query = new FindMediaByCriteriaQuery()

    const response = await handler.handle(query)

    repository.assertSearchHasBeenCalledWith(new Criteria())
    expect(response).toEqual(new MediaCollectionResponse([media]))
  })
})
