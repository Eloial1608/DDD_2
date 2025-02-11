import { FindSectionByIdQueryHandler } from '@Course/Section/application/FindById/FindSectionByIdQueryHandler'
import { FinderById } from '@Course/Section/application/FindById/FinderById'
import { SectionRepositoryMock } from '../../__mocks__/SectionRepositoryMock'
import { SectionMother } from '../../domain/SectionMother'
import { FindSectionByIdQuery } from '@Course/Section/application/FindById/FindSectionByIdQuery'
import { SectionResponse } from '@Course/Section/application/SectionResponse'
import { SectionNotFound } from '@Course/Section/domain/Errors/SectionNotFound'

let repository: SectionRepositoryMock
let finder: FinderById
let handler: FindSectionByIdQueryHandler

describe('FindSectionByIdQueryHandler should', () => {
  beforeEach(() => {
    repository = new SectionRepositoryMock()
    finder = new FinderById(repository)
    handler = new FindSectionByIdQueryHandler(finder)
  })

  test('Return a section', async () => {
    const section = SectionMother.random()

    repository.returnOnFind(section)

    const query = new FindSectionByIdQuery(section.id.valueOf())

    const response = await handler.handle(query)

    repository.assertFindHasBeenCalledWith(section.id)
    expect(response).toEqual(new SectionResponse(section))
  })

  test('Fail if a section doesnt exists', async () => {
    const section = SectionMother.random()

    const query = new FindSectionByIdQuery(section.id.valueOf())

    expect(handler.handle(query)).rejects.toThrowError(SectionNotFound)
  })
})
