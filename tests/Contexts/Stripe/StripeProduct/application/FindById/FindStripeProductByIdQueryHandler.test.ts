import { FindStripeProductByIdQueryHandler } from '@Stripe/StripeProduct/application/FindById/FindStripeProductByIdQueryHandler'
import { FinderById } from '@Stripe/StripeProduct/application/FindById/FinderById'
import { StripeProductRepositoryMock } from '../../__mocks__/StripeProductRepositoryMock'
import { StripeProductMother } from '../../domain/StripeProductMother'
import { FindStripeProductByIdQuery } from '@Stripe/StripeProduct/application/FindById/FindStripeProductByIdQuery'
import { StripeProductResponse } from '@Stripe/StripeProduct/application/StripeProductResponse'
import { StripeProductNotFound } from '@Stripe/StripeProduct/domain/Errors/StripeProductNotFound'

let repository: StripeProductRepositoryMock
let finder: FinderById
let handler: FindStripeProductByIdQueryHandler

describe('FindStripeProductByIdQueryHandler should', () => {
  beforeEach(() => {
    repository = new StripeProductRepositoryMock()
    finder = new FinderById(repository)
    handler = new FindStripeProductByIdQueryHandler(finder)
  })

  test('Return a stripeProduct', async () => {
    const stripeProduct = StripeProductMother.random()

    repository.returnOnFind(stripeProduct)

    const query = new FindStripeProductByIdQuery(stripeProduct.id.valueOf())

    const response = await handler.handle(query)

    repository.assertFindHasBeenCalledWith(stripeProduct.id)
    expect(response).toEqual(new StripeProductResponse(stripeProduct))
  })

  test('Fail if a stripeProduct doesnt exists', async () => {
    const stripeProduct = StripeProductMother.random()

    const query = new FindStripeProductByIdQuery(stripeProduct.id.valueOf())

    expect(handler.handle(query)).rejects.toThrowError(StripeProductNotFound)
  })
})
