import { FindCourseUsersByCriteriaQueryHandler } from '@Course/CourseUser/application/FindByCriteria/FindCourseUsersByCriteriaQueryHandler'
import { FinderByCriteria } from '@Course/CourseUser/application/FindByCriteria/FinderByCriteria'
import { CourseUserRepositoryMock } from '../../__mocks__/CourseUserRepositoryMock'
import { CourseUserMother } from '../../domain/CourseUserMother'
import { FindCourseUsersByCriteriaQuery } from '@Course/CourseUser/application/FindByCriteria/FindCourseUsersByCriteriaQuery'
import { CourseUserCollectionResponse } from '@Course/CourseUser/application/CourseUserCollectionResponse'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

let repository: CourseUserRepositoryMock
let finder: FinderByCriteria
let handler: FindCourseUsersByCriteriaQueryHandler

describe('FindCourseUsersByCriteriaQueryHandler should', () => {
  beforeEach(() => {
    repository = new CourseUserRepositoryMock()
    finder = new FinderByCriteria(repository)
    handler = new FindCourseUsersByCriteriaQueryHandler(finder)
  })

  test('Return a CourseUser collection', async () => {
    const CourseUser = CourseUserMother.random()

    repository.returnOnSearch([CourseUser])

    const query = new FindCourseUsersByCriteriaQuery()

    const response = await handler.handle(query)

    repository.assertSearchHasBeenCalledWith(new Criteria())
    expect(response).toEqual(new CourseUserCollectionResponse([CourseUser]))
  })
})
