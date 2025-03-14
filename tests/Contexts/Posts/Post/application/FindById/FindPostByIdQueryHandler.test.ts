import { FindPostByIdQueryHandler } from '@Posts/Post/application/FindById/FindPostByIdQueryHandler'
import { FinderById } from '@Posts/Post/application/FindById/FinderById'
import { PostRepositoryMock } from '../../__mocks__/PostRepositoryMock'
import { PostMother } from '../../domain/PostMother'
import { FindPostByIdQuery } from '@Posts/Post/application/FindById/FindPostByIdQuery'
import { PostResponse } from '@Posts/Post/application/PostResponse'
import { PostNotFound } from '@Posts/Post/domain/Errors/PostNotFound'

let repository: PostRepositoryMock
let finder: FinderById
let handler: FindPostByIdQueryHandler

describe('FindPostByIdQueryHandler should', () => {
  beforeEach(() => {
    repository = new PostRepositoryMock()
    finder = new FinderById(repository)
    handler = new FindPostByIdQueryHandler(finder)
  })

  test('Return a post', async () => {
    const post = PostMother.random()

    repository.returnOnFind(post)

    const query = new FindPostByIdQuery(post.id.valueOf())

    const response = await handler.handle(query)

    repository.assertFindHasBeenCalledWith(post.id)
    expect(response).toEqual(new PostResponse(post))
  })

  test('Fail if a post doesnt exists', async () => {
    const post = PostMother.random()

    const query = new FindPostByIdQuery(post.id.valueOf())

    expect(handler.handle(query)).rejects.toThrowError(PostNotFound)
  })
})
