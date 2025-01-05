import { FindMediaByIdQueryHandler } from '@Media/Media/application/FindById/FindMediaByIdQueryHandler'
import { FinderById } from '@Media/Media/application/FindById/FinderById'
import { MediaRepositoryMock } from '../../__mocks__/MediaRepositoryMock'
import { MediaMother } from '../../domain/MediaMother'
import { FindMediaByIdQuery } from '@Media/Media/application/FindById/FindMediaByIdQuery'
import { MediaResponse } from '@Media/Media/application/MediaResponse'
import { MediaNotFound } from '@Media/Media/domain/Errors/MediaNotFound'

let repository: MediaRepositoryMock
let finder: FinderById
let handler: FindMediaByIdQueryHandler

describe('FindMediaByIdQueryHandler should', () => {
  beforeEach(() => {
    repository = new MediaRepositoryMock()
    finder = new FinderById(repository)
    handler = new FindMediaByIdQueryHandler(finder)
  })

  test('Return a media', async () => {
    const media = MediaMother.random()

    repository.returnOnFind(media)

    const query = new FindMediaByIdQuery(media.id.valueOf())

    const response = await handler.handle(query)

    repository.assertFindHasBeenCalledWith(media.id)
    expect(response).toEqual(new MediaResponse(media))
  })

  test('Fail if a media doesnt exists', async () => {
    const media = MediaMother.random()

    const query = new FindMediaByIdQuery(media.id.valueOf())

    expect(handler.handle(query)).rejects.toThrowError(MediaNotFound)
  })
})
