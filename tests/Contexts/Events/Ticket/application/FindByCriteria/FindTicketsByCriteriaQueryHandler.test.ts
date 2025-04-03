import { FindTicketsByCriteriaQueryHandler } from '@Events/Ticket/application/FindByCriteria/FindTicketsByCriteriaQueryHandler'
import { FinderByCriteria } from '@Events/Ticket/application/FindByCriteria/FinderByCriteria'
import { TicketRepositoryMock } from '../../__mocks__/TicketRepositoryMock'
import { TicketMother } from '../../domain/TicketMother'
import { FindTicketsByCriteriaQuery } from '@Events/Ticket/application/FindByCriteria/FindTicketsByCriteriaQuery'
import { TicketCollectionResponse } from '@Events/Ticket/application/TicketCollectionResponse'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

let repository: TicketRepositoryMock
let finder: FinderByCriteria
let handler: FindTicketsByCriteriaQueryHandler

describe('FindTicketsByCriteriaQueryHandler should', () => {
  beforeEach(() => {
    repository = new TicketRepositoryMock()
    finder = new FinderByCriteria(repository)
    handler = new FindTicketsByCriteriaQueryHandler(finder)
  })

  test('Return a ticket collection', async () => {
    const ticket = TicketMother.random()

    repository.returnOnSearch([ticket])

    const query = new FindTicketsByCriteriaQuery()

    const response = await handler.handle(query)

    repository.assertSearchHasBeenCalledWith(new Criteria())
    expect(response).toEqual(new TicketCollectionResponse([ticket]))
  })
})
