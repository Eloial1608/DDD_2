import { FindDigitalStocksByCriteriaQueryHandler } from '@Marketplace/DigitalStock/application/FindByCriteria/FindDigitalStocksByCriteriaQueryHandler'
import { FinderByCriteria } from '@Marketplace/DigitalStock/application/FindByCriteria/FinderByCriteria'
import { DigitalStockRepositoryMock } from '../../__mocks__/DigitalStockRepositoryMock'
import { DigitalStockMother } from '../../domain/DigitalStockMother'
import { FindDigitalStocksByCriteriaQuery } from '@Marketplace/DigitalStock/application/FindByCriteria/FindDigitalStocksByCriteriaQuery'
import { DigitalStockCollectionResponse } from '@Marketplace/DigitalStock/application/DigitalStockCollectionResponse'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

describe('FindDigitalStocksByCriteriaQueryHandler should', () => {
  let repository: DigitalStockRepositoryMock
  let finder: FinderByCriteria
  let handler: FindDigitalStocksByCriteriaQueryHandler

  beforeEach(() => {
    repository = new DigitalStockRepositoryMock()
    finder = new FinderByCriteria(repository)
    handler = new FindDigitalStocksByCriteriaQueryHandler(finder)
  })

  test('Return a digital stock collection', async () => {
    const stock = DigitalStockMother.random()
    repository.returnOnSearch([stock])
    const query = new FindDigitalStocksByCriteriaQuery(new Criteria())
    const response = await handler.handle(query)
    repository.assertSearchHasBeenCalledWith(new Criteria())
    expect(response).toEqual(new DigitalStockCollectionResponse([stock]))
  })
})
