import { FindStripeAccountByIdQueryHandler } from '@Stripe/StripeAccount/application/FindById/FindStripeAccountByIdQueryHandler'
import { FinderById } from '@Stripe/StripeAccount/application/FindById/FinderById'
import { StripeAccountRepositoryMock } from '../../__mocks__/StripeAccountRepositoryMock'
import { StripeAccountMother } from '../../domain/StripeAccountMother'
import { FindStripeAccountByIdQuery } from '@Stripe/StripeAccount/application/FindById/FindStripeAccountByIdQuery'
import { StripeAccountResponse } from '@Stripe/StripeAccount/application/StripeAccountResponse'
import { StripeAccountNotFound } from '@Stripe/StripeAccount/domain/Errors/StripeAccountNotFound'

let repository: StripeAccountRepositoryMock
let finder: FinderById
let handler: FindStripeAccountByIdQueryHandler

describe('FindStripeAccountByIdQueryHandler should', () => {
  beforeEach(() => {
    repository = new StripeAccountRepositoryMock()
    finder = new FinderById(repository)
    handler = new FindStripeAccountByIdQueryHandler(finder)
  })

  test('Return a stripeaccount', async () => {
    const stripeaccount = StripeAccountMother.random()

    repository.returnOnFind(stripeaccount)

    const query = new FindStripeAccountByIdQuery(stripeaccount.id.valueOf())

    const response = await handler.handle(query)

    repository.assertFindHasBeenCalledWith(stripeaccount.id)
    expect(response).toEqual(new StripeAccountResponse(stripeaccount))
  })

  test('Fail if a stripeaccount doesnt exists', async () => {
    const stripeaccount = StripeAccountMother.random()

    const query = new FindStripeAccountByIdQuery(stripeaccount.id.valueOf())

    expect(handler.handle(query)).rejects.toThrowError(StripeAccountNotFound)
  })
})
