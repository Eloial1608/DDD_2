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

  test('Return a stripeproduct', async () => {
    const stripeproduct = StripeProductMother.random()

    repository.returnOnFind(stripeproduct)

    const query = new FindStripeProductByIdQuery(stripeproduct.id.valueOf())

    const response = await handler.handle(query)

    repository.assertFindHasBeenCalledWith(stripeproduct.id)
    expect(response).toEqual(new StripeProductResponse(stripeproduct))
  })

  test('Fail if a stripeproduct doesnt exists', async () => {
    const stripeproduct = StripeProductMother.random()

    const query = new FindStripeProductByIdQuery(stripeproduct.id.valueOf())

    expect(handler.handle(query)).rejects.toThrowError(StripeProductNotFound)
  })
})
