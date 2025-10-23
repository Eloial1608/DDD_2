import { FindProductsByCriteriaQueryHandler } from '@Marketplace/Products/application/FindByCriteria/FindProductsByCriteriaQueryHandler'
import { FinderByCriteria } from '@Marketplace/Products/application/FindByCriteria/FinderByCriteria'
import { ProductRepositoryMock } from '../../__mocks__/ProductRepositoryMock'
import { ProductMother } from '../../domain/ProductMother'
import { FindProductsByCriteriaQuery } from '@Marketplace/Products/application/FindByCriteria/FindProductsByCriteriaQuery'
import { ProductCollectionResponse } from '@Marketplace/Products/application/ProductCollectionResponse'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

let repository: ProductRepositoryMock
let finder: FinderByCriteria
let handler: FindProductsByCriteriaQueryHandler

describe('FindProductsByCriteriaQueryHandler should', () => {
  beforeEach(() => {
    repository = new ProductRepositoryMock()
    finder = new FinderByCriteria(repository)
    handler = new FindProductsByCriteriaQueryHandler(finder)
  })

  test('Return a product collection', async () => {
    const product = ProductMother.random()

    repository.returnOnSearch([product])

    const query = new FindProductsByCriteriaQuery()

    const response = await handler.handle(query)

    repository.assertSearchHasBeenCalledWith(new Criteria())
    expect(response).toEqual(new ProductCollectionResponse([product]))
  })
})
