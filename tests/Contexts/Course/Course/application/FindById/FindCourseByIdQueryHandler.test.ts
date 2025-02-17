import { FindCourseByIdQueryHandler } from '@Course/Course/application/FindById/FindCourseByIdQueryHandler'
import { FinderById } from '@Course/Course/application/FindById/FinderById'
import { CourseRepositoryMock } from '../../__mocks__/CourseRepositoryMock'
import { CourseMother } from '../../domain/CourseMother'
import { FindCourseByIdQuery } from '@Course/Course/application/FindById/FindCourseByIdQuery'
import { CourseResponse } from '@Course/Course/application/CourseResponse'
import { CourseNotFound } from '@Course/Course/domain/Errors/CourseNotFound'

let repository: CourseRepositoryMock
let finder: FinderById
let handler: FindCourseByIdQueryHandler

describe('FindCourseByIdQueryHandler should', () => {
  beforeEach(() => {
    repository = new CourseRepositoryMock()
    finder = new FinderById(repository)
    handler = new FindCourseByIdQueryHandler(finder)
  })

  test('Return a course', async () => {
    const course = CourseMother.random()

    repository.returnOnFind(course)

    const query = new FindCourseByIdQuery(course.id.valueOf())

    const response = await handler.handle(query)

    repository.assertFindHasBeenCalledWith(course.id)
    expect(response).toEqual(new CourseResponse(course))
  })

  test('Fail if a course doesnt exists', async () => {
    const course = CourseMother.random()

    const query = new FindCourseByIdQuery(course.id.valueOf())

    expect(handler.handle(query)).rejects.toThrowError(CourseNotFound)
  })
})
