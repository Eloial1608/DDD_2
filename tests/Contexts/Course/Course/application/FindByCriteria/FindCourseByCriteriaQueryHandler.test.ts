import { FindCourseByCriteriaQueryHandler } from '@Course/Course/application/FindByCriteria/FindCourseByCriteriaQueryHandler'
import { FinderByCriteria } from '@Course/Course/application/FindByCriteria/FinderByCriteria'
import { CourseRepositoryMock } from '../../__mocks__/CourseRepositoryMock'
import { CourseMother } from '../../domain/CourseMother'
import { FindCourseByCriteriaQuery } from '@Course/Course/application/FindByCriteria/FindCourseByCriteriaQuery'
import { CourseCollectionResponse } from '@Course/Course/application/CourseCollectionResponse'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

let repository: CourseRepositoryMock
let finder: FinderByCriteria
let handler: FindCourseByCriteriaQueryHandler

describe('FindCourseByCriteriaQueryHandler should', () => {
  beforeEach(() => {
    repository = new CourseRepositoryMock()
    finder = new FinderByCriteria(repository)
    handler = new FindCourseByCriteriaQueryHandler(finder)
  })

  test('Return a course collection', async () => {
    const course = CourseMother.random()

    repository.returnOnSearch([course])

    const query = new FindCourseByCriteriaQuery()

    const response = await handler.handle(query)

    repository.assertSearchHasBeenCalledWith(new Criteria())
    expect(response).toEqual(new CourseCollectionResponse([course]))
  })
})
