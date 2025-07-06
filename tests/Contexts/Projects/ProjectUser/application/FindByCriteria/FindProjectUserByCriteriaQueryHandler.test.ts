import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { ProjectUserRepositoryMock } from '../../__mocks__/ProjectUserRepositoryMock'
import { FinderByCriteria } from '@Projects/ProjectUser/application/FindByCriteria/FinderByCriteria'
import { FindProjectUsersByCriteriaQueryHandler } from '@Projects/ProjectUser/application/FindByCriteria/FindProjectUsersByCriteriaQueryHandler'
import { ProjectUserMother } from '../../domain/ProjectUserMother'
import { FindProjectUsersByCriteriaQuery } from '@Projects/ProjectUser/application/FindByCriteria/FindProjectUsersByCriteriaQuery'
import { ProjectUserCollectionResponse } from '@Projects/ProjectUser/application/ProjectUserCollectionResponse'

let repository: ProjectUserRepositoryMock
let finder: FinderByCriteria
let handler: FindProjectUsersByCriteriaQueryHandler

describe('FindProjectUsersByCriteriaQueryHandler should', () => {
  beforeEach(() => {
    repository = new ProjectUserRepositoryMock()
    finder = new FinderByCriteria(repository)
    handler = new FindProjectUsersByCriteriaQueryHandler(finder)
  })

  test('Return a ProjectUser collection', async () => {
    const projectUser = ProjectUserMother.random()

    repository.returnOnSearch([projectUser])

    const query = new FindProjectUsersByCriteriaQuery()

    const response = await handler.handle(query)

    repository.assertSearchHasBeenCalledWith(new Criteria())
    expect(response).toEqual(new ProjectUserCollectionResponse([projectUser]))
  })
})
