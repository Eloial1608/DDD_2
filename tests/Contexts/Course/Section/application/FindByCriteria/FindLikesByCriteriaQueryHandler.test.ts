import { FindSectionsByCriteriaQueryHandler } from '@Course/Section/application/FindByCriteria/FindSectionsByCriteriaQueryHandler'
import { FinderByCriteria } from '@Course/Section/application/FindByCriteria/FinderByCriteria'
import { SectionRepositoryMock } from '../../__mocks__/SectionRepositoryMock'
import { SectionMother } from '../../domain/SectionMother'
import { FindSectionsByCriteriaQuery } from '@Course/Section/application/FindByCriteria/FindSectionsByCriteriaQuery'
import { SectionCollectionResponse } from '@Course/Section/application/SectionCollectionResponse'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

let repository: SectionRepositoryMock
let finder: FinderByCriteria
let handler: FindSectionsByCriteriaQueryHandler

describe('FindSectionsByCriteriaQueryHandler should', () => {
  beforeEach(() => {
    repository = new SectionRepositoryMock()
    finder = new FinderByCriteria(repository)
    handler = new FindSectionsByCriteriaQueryHandler(finder)
  })

  test('Return a section collection', async () => {
    const section = SectionMother.random()

    repository.returnOnSearch([section])

    const query = new FindSectionsByCriteriaQuery()

    const response = await handler.handle(query)

    repository.assertSearchHasBeenCalledWith(new Criteria())
    expect(response).toEqual(new SectionCollectionResponse([section]))
  })
})
