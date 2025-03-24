import { FindLessonByIdQueryHandler } from '@Course/Lesson/application/FindById/FindLessonByIdQueryHandler'
import { FinderById } from '@Course/Lesson/application/FindById/FinderById'
import { LessonRepositoryMock } from '../../__mocks__/LessonRepositoryMock'
import { LessonMother } from '../../domain/LessonMother'
import { FindLessonByIdQuery } from '@Course/Lesson/application/FindById/FindLessonByIdQuery'
import { LessonResponse } from '@Course/Lesson/application/LessonResponse'
import { LessonNotFound } from '@Course/Lesson/domain/Errors/LessonNotFound'

let repository: LessonRepositoryMock
let finder: FinderById
let handler: FindLessonByIdQueryHandler

describe('FindLessonByIdQueryHandler should', () => {
  beforeEach(() => {
    repository = new LessonRepositoryMock()
    finder = new FinderById(repository)
    handler = new FindLessonByIdQueryHandler(finder)
  })

  test('Return a lesson', async () => {
    const lesson = LessonMother.random()

    repository.returnOnFind(lesson)

    const query = new FindLessonByIdQuery(lesson.id.valueOf())

    const response = await handler.handle(query)

    repository.assertFindHasBeenCalledWith(lesson.id)
    expect(response).toEqual(new LessonResponse(lesson))
  })

  test('Fail if a lesson doesnt exists', async () => {
    const lesson = LessonMother.random()

    const query = new FindLessonByIdQuery(lesson.id.valueOf())

    expect(handler.handle(query)).rejects.toThrowError(LessonNotFound)
  })
})
