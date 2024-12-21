import { FindStripeSessionByIdQueryHandler } from '@Stripe/StripeSession/application/FindById/FindStripeSessionByIdQueryHandler'
import { FinderById } from '@Stripe/StripeSession/application/FindById/FinderById'
import { StripeSessionRepositoryMock } from '../../__mocks__/StripeSessionRepositoryMock'
import { StripeSessionMother } from '../../domain/StripeSessionMother'
import { FindStripeSessionByIdQuery } from '@Stripe/StripeSession/application/FindById/FindStripeSessionByIdQuery'
import { StripeSessionResponse } from '@Stripe/StripeSession/application/StripeSessionResponse'
import { StripeSessionNotFound } from '@Stripe/StripeSession/domain/Errors/StripeSessionNotFound'

let repository: StripeSessionRepositoryMock
let finder: FinderById
let handler: FindStripeSessionByIdQueryHandler

describe('FindStripeSessionByIdQueryHandler should', () => {
  beforeEach(() => {
    repository = new StripeSessionRepositoryMock()
    finder = new FinderById(repository)
    handler = new FindStripeSessionByIdQueryHandler(finder)
  })

  test('Return a stripesession', async () => {
    const stripesession = StripeSessionMother.random()

    repository.returnOnFind(stripesession)

    const query = new FindStripeSessionByIdQuery(stripesession.id.valueOf())

    const response = await handler.handle(query)

    repository.assertFindHasBeenCalledWith(stripesession.id)
    expect(response).toEqual(new StripeSessionResponse(stripesession))
  })

  test('Fail if a stripesession doesnt exists', async () => {
    const stripesession = StripeSessionMother.random()

    const query = new FindStripeSessionByIdQuery(stripesession.id.valueOf())

    expect(handler.handle(query)).rejects.toThrowError(StripeSessionNotFound)
  })
})
