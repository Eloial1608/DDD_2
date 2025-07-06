import { FindReviewsByCriteriaQueryHandler } from '@Marketplace/Reviews/application/FindByCriteria/FindReviewsByCriteriaQueryHandler'
import { FinderByCriteria } from '@Marketplace/Reviews/application/FindByCriteria/FinderByCriteria'
import { ReviewRepositoryMock } from '../../__mocks__/ReviewRepositoryMock'
import { ReviewMother } from '../../domain/ReviewMother'
import { FindReviewsByCriteriaQuery } from '@Marketplace/Reviews/application/FindByCriteria/FindReviewsByCriteriaQuery'
import { ReviewCollectionResponse } from '@Marketplace/Reviews/application/ReviewCollectionResponse'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

let repository: ReviewRepositoryMock
let finder: FinderByCriteria
let handler: FindReviewsByCriteriaQueryHandler

describe('FindReviewsByCriteriaQueryHandler should', () => {
  beforeEach(() => {
    repository = new ReviewRepositoryMock()
    finder = new FinderByCriteria(repository)
    handler = new FindReviewsByCriteriaQueryHandler(finder)
  })

  test('Return a review collection', async () => {
    const review = ReviewMother.random()

    repository.returnOnSearch([review])

    const query = new FindReviewsByCriteriaQuery()

    const response = await handler.handle(query)

    repository.assertSearchHasBeenCalledWith(new Criteria())
    expect(response).toEqual(new ReviewCollectionResponse([review]))
  })
})
