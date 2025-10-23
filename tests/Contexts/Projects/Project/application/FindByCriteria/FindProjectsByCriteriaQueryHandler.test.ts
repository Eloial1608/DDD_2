import { FinderByCriteria } from '@Projects/Project/application/FindByCriteria/FinderByCriteria'
import { FindProjectsByCriteriaQueryHandler } from '@Projects/Project/application/FindByCriteria/FindProjectsByCriteriaQueryHandler'
import { ProjectRepositoryMock } from '../../__mocks__/ProjectRepositoryMock'
import { ProjectMother } from '../../domain/ProjectMother'
import { FindProjectsByCriteriaQuery } from '@Projects/Project/application/FindByCriteria/FindProjectsByCriteriaQuery'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { ProjectCollectionResponse } from '@Projects/Project/application/ProjectCollectionResponse'

let repository: ProjectRepositoryMock
let finder: FinderByCriteria
let handler: FindProjectsByCriteriaQueryHandler

describe('FindProjectByCriteriaQueryHandler should', () => {
  beforeEach(() => {
    repository = new ProjectRepositoryMock()
    finder = new FinderByCriteria(repository)
    handler = new FindProjectsByCriteriaQueryHandler(finder)
  })

  test('Return a project collection', async () => {
    const project = ProjectMother.random()

    repository.returnOnSearch([project])

    const query = new FindProjectsByCriteriaQuery()

    const response = await handler.handle(query)

    repository.assertSearchHasBeenCalledWith(new Criteria())
    expect(response).toEqual(new ProjectCollectionResponse([project]))
  })
})
