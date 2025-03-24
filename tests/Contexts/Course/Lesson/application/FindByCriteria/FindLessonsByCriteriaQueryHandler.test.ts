import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { LessonRepositoryMock } from '../../__mocks__/LessonRepositoryMock'
import { FinderByCriteria } from '@Course/Lesson/application/FindByCriteria/FinderByCriteria'
import { FindLessonsByCriteriaQueryHandler } from '@Course/Lesson/application/FindByCriteria/FindLessonsByCriteriaQueryHandler'
import { LessonMother } from '../../domain/LessonMother'
import { FindLessonsByCriteriaQuery } from '@Course/Lesson/application/FindByCriteria/FindLessonsByCriteriaQuery'
import { LessonCollectionResponse } from '@Course/Lesson/application/LessonCollectionResponse'

let repository: LessonRepositoryMock
let finder: FinderByCriteria
let handler: FindLessonsByCriteriaQueryHandler

describe('FindLessonsByCriteriaQueryHandler should', () => {
  beforeEach(() => {
    repository = new LessonRepositoryMock()
    finder = new FinderByCriteria(repository)
    handler = new FindLessonsByCriteriaQueryHandler(finder)
  })

  test('Return a lesson collection', async () => {
    const lesson = LessonMother.random()

    repository.returnOnSearch([lesson])

    const query = new FindLessonsByCriteriaQuery()

    const response = await handler.handle(query)

    repository.assertSearchHasBeenCalledWith(new Criteria())
    expect(response).toEqual(new LessonCollectionResponse([lesson]))
  })
})
