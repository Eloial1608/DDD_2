import { FindProductByIdQueryHandler } from '@Marketplace/Products/application/FindById/FindProductByIdQueryHandler'
import { FinderById } from '@Marketplace/Products/application/FindById/FinderById'
import { ProductRepositoryMock } from '../../__mocks__/ProductRepositoryMock'
import { ProductMother } from '../../domain/ProductMother'
import { FindProductByIdQuery } from '@Marketplace/Products/application/FindById/FindProductByIdQuery'
import { ProductResponse } from '@Marketplace/Products/application/ProductResponse'
import { ProductNotFound } from '@Marketplace/Products/domain/Errors/ProductNotFound'

let repository: ProductRepositoryMock
let finder: FinderById
let handler: FindProductByIdQueryHandler

describe('FindProductByIdQueryHandler should', () => {
  beforeEach(() => {
    repository = new ProductRepositoryMock()
    finder = new FinderById(repository)
    handler = new FindProductByIdQueryHandler(finder)
  })

  test('Return a product', async () => {
    const product = ProductMother.random()

    repository.returnOnFind(product)

    const query = new FindProductByIdQuery(product.id.valueOf())

    const response = await handler.handle(query)

    repository.assertFindHasBeenCalledWith(product.id)
    expect(response).toEqual(new ProductResponse(product))
  })

  test('Fail if a product doesnt exists', async () => {
    const product = ProductMother.random()

    const query = new FindProductByIdQuery(product.id.valueOf())

    expect(handler.handle(query)).rejects.toThrowError(ProductNotFound)
  })
})
