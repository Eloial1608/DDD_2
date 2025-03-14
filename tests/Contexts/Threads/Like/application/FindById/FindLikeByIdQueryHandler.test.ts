import { FindLikeByIdQueryHandler } from '@Threads/Like/application/FindById/FindLikeByIdQueryHandler'
import { FinderById } from '@Threads/Like/application/FindById/FinderById'
import { LikeRepositoryMock } from '../../__mocks__/LikeRepositoryMock'
import { LikeMother } from '../../domain/LikeMother'
import { FindLikeByIdQuery } from '@Threads/Like/application/FindById/FindLikeByIdQuery'
import { LikeResponse } from '@Threads/Like/application/LikeResponse'
import { LikeNotFound } from '@Threads/Like/domain/Errors/LikeNotFound'

let repository: LikeRepositoryMock
let finder: FinderById
let handler: FindLikeByIdQueryHandler

describe('FindLikeByIdQueryHandler should', () => {
  beforeEach(() => {
    repository = new LikeRepositoryMock()
    finder = new FinderById(repository)
    handler = new FindLikeByIdQueryHandler(finder)
  })

  test('Return a like', async () => {
    const like = LikeMother.random()

    repository.returnOnFind(like)

    const query = new FindLikeByIdQuery(like.id.valueOf())

    const response = await handler.handle(query)

    repository.assertFindHasBeenCalledWith(like.id)
    expect(response).toEqual(new LikeResponse(like))
  })

  test('Fail if a like doesnt exists', async () => {
    const like = LikeMother.random()

    const query = new FindLikeByIdQuery(like.id.valueOf())

    expect(handler.handle(query)).rejects.toThrowError(LikeNotFound)
  })
})
