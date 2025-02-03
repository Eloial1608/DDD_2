import { FindFormsByCriteriaQueryHandler } from '@Core/Form/application/FindByCriteria/FindFormsByCriteriaQueryHandler'
import { FinderByCriteria } from '@Core/Form/application/FindByCriteria/FinderByCriteria'
import { FormRepositoryMock } from '../../__mocks__/FormRepositoryMock'
import { FormMother } from '../../domain/FormMother'
import { FindFormsByCriteriaQuery } from '@Core/Form/application/FindByCriteria/FindFormsByCriteriaQuery'
import { FormCollectionResponse } from '@Core/Form/application/FormCollectionResponse'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

let repository: FormRepositoryMock
let finder: FinderByCriteria
let handler: FindFormsByCriteriaQueryHandler

describe('FindFormsByCriteriaQueryHandler should', () => {
  beforeEach(() => {
    repository = new FormRepositoryMock()
    finder = new FinderByCriteria(repository)
    handler = new FindFormsByCriteriaQueryHandler(finder)
  })

  test('Return a form collection', async () => {
    const form = FormMother.random()

    repository.returnOnSearch([form])

    const query = new FindFormsByCriteriaQuery()

    const response = await handler.handle(query)

    repository.assertSearchHasBeenCalledWith(new Criteria())
    expect(response).toEqual(new FormCollectionResponse([form]))
  })
})
