import { FindCommentByIdQueryHandler } from '@Media/Comment/application/FindById/FindCommentByIdQueryHandler'
import { FinderById } from '@Media/Comment/application/FindById/FinderById'
import { CommentRepositoryMock } from '../../__mocks__/CommentRepositoryMock'
import { CommentMother } from '../../domain/CommentMother'
import { FindCommentByIdQuery } from '@Media/Comment/application/FindById/FindCommentByIdQuery'
import { CommentResponse } from '@Media/Comment/application/CommentResponse'
import { CommentNotFound } from '@Media/Comment/domain/Errors/CommentNotFound'

let repository: CommentRepositoryMock
let finder: FinderById
let handler: FindCommentByIdQueryHandler

describe('FindCommentByIdQueryHandler should', () => {
  beforeEach(() => {
    repository = new CommentRepositoryMock()
    finder = new FinderById(repository)
    handler = new FindCommentByIdQueryHandler(finder)
  })

  test('Return a comment', async () => {
    const comment = CommentMother.random()

    repository.returnOnFind(comment)

    const query = new FindCommentByIdQuery(comment.id.valueOf())

    const response = await handler.handle(query)

    repository.assertFindHasBeenCalledWith(comment.id)
    expect(response).toEqual(new CommentResponse(comment))
  })

  test('Fail if a comment doesnt exists', async () => {
    const comment = CommentMother.random()

    const query = new FindCommentByIdQuery(comment.id.valueOf())

    expect(handler.handle(query)).rejects.toThrowError(CommentNotFound)
  })
})
