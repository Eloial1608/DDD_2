import { FinderById } from '@Projects/Status/application/FindById/FinderById'
import { StatusRepositoryMock } from '../../__mocks__/StatusRepositoryMock'
import { FindStatusByIdQueryHandler } from '@Projects/Status/application/FindById/FindStatusByIdQueryHandler'
import { StatusMother } from '../../domain/StatusMother'
import { StatusResponse } from '@Projects/Status/application/StatusResponse'
import { FindStatusByIdQuery } from '@Projects/Status/application/FindById/FindStatusByIdQuery'
import { StatusNotFound } from '@Projects/Status/domain/Errors/StatusNotFound'

let repository: StatusRepositoryMock
let finder: FinderById
let handler: FindStatusByIdQueryHandler

describe('FindStatusByIdQueryHandler should', () => {
  beforeEach(() => {
    repository = new StatusRepositoryMock()
    finder = new FinderById(repository)
    handler = new FindStatusByIdQueryHandler(finder)
  })

  test('Return a status', async () => {
    const status = StatusMother.random()

    repository.returnOnFind(status)

    const query = new FindStatusByIdQuery(status.id.valueOf())
    const response = await handler.handle(query)

    repository.assertFindHasBeenCalledWith(status.id)
    expect(response).toEqual(new StatusResponse(status))
  })

  test('Fail if a status does not exist', async () => {
    const status = StatusMother.random()

    const query = new FindStatusByIdQuery(status.id.valueOf())

    expect(handler.handle(query)).rejects.toThrowError(StatusNotFound)
  })
})
