import { FindContentByIdQueryHandler } from '@Media/Content/application/FindById/FindContentByIdQueryHandler'
import { FinderById } from '@Media/Content/application/FindById/FinderById'
import { ContentRepositoryMock } from '../../__mocks__/ContentRepositoryMock'
import { ContentMother } from '../../domain/ContentMother'
import { FindContentByIdQuery } from '@Media/Content/application/FindById/FindContentByIdQuery'
import { ContentResponse } from '@Media/Content/application/ContentResponse'
import { ContentNotFound } from '@Media/Content/domain/Errors/ContentNotFound'

let repository: ContentRepositoryMock
let finder: FinderById
let handler: FindContentByIdQueryHandler

describe('FindContentByIdQueryHandler should', () => {
  beforeEach(() => {
    repository = new ContentRepositoryMock()
    finder = new FinderById(repository)
    handler = new FindContentByIdQueryHandler(finder)
  })

  test('Return a content', async () => {
    const content = ContentMother.random()

    repository.returnOnFind(content)

    const query = new FindContentByIdQuery(content.id.valueOf())

    const response = await handler.handle(query)

    repository.assertFindHasBeenCalledWith(content.id)
    expect(response).toEqual(new ContentResponse(content))
  })

  test('Fail if a content doesnt exists', async () => {
    const content = ContentMother.random()

    const query = new FindContentByIdQuery(content.id.valueOf())

    expect(handler.handle(query)).rejects.toThrowError(ContentNotFound)
  })
})
