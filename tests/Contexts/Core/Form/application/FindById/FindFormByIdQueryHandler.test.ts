import { FindFormByIdQueryHandler } from '@Core/Form/application/FindById/FindFormByIdQueryHandler'
import { FinderById } from '@Core/Form/application/FindById/FinderById'
import { FormRepositoryMock } from '../../__mocks__/FormRepositoryMock'
import { FormMother } from '../../domain/FormMother'
import { FindFormByIdQuery } from '@Core/Form/application/FindById/FindFormByIdQuery'
import { FormResponse } from '@Core/Form/application/FormResponse'
import { FormNotFound } from '@Core/Form/domain/Errors/FormNotFound'

let repository: FormRepositoryMock
let finder: FinderById
let handler: FindFormByIdQueryHandler

describe('FindFormByIdQueryHandler should', () => {
  beforeEach(() => {
    repository = new FormRepositoryMock()
    finder = new FinderById(repository)
    handler = new FindFormByIdQueryHandler(finder)
  })

  test('Return a form', async () => {
    const form = FormMother.random()

    repository.returnOnFind(form)

    const query = new FindFormByIdQuery(form.id.valueOf())

    const response = await handler.handle(query)

    repository.assertFindHasBeenCalledWith(form.id)
    expect(response).toEqual(new FormResponse(form))
  })

  test('Fail if a form doesnt exists', async () => {
    const form = FormMother.random()

    const query = new FindFormByIdQuery(form.id.valueOf())

    expect(handler.handle(query)).rejects.toThrowError(FormNotFound)
  })
})
