import { FinderById } from "@Projects/Project/application/FindById/FinderById";
import { ProjectRepositoryMock } from "../../__mocks__/ProjectRepositoryMock";
import { FindProjectByIdQueryHandler } from "@Projects/Project/application/FindById/FindProjectByIdQueryHandler";
import { ProjectMother } from "../../domain/ProjectMother";
import { ProjectResponse } from "@Projects/Project/application/ProjectResponse";
import { FindProjectByIdQuery } from "@Projects/Project/application/FindById/FindProjectByIdQuery";
import { ProjectNotFound } from "@Projects/Project/domain/Errors/ProjectNotFound";

let repository: ProjectRepositoryMock
let finder: FinderById
let handler: FindProjectByIdQueryHandler

describe('FindProjectByIdQueryHandler should', () => {
  beforeEach(() => {
    repository = new ProjectRepositoryMock()
    finder = new FinderById(repository)
    handler = new FindProjectByIdQueryHandler(finder)
  })

  test('Return a project', async () => {
    const project = ProjectMother.random()

    repository.returnOnFind(project)

    const query = new FindProjectByIdQuery(project.id.valueOf())
    const response = await handler.handle(query)

    repository.assertFindHasBeenCalledWith(project.id)
    expect(response).toEqual(new ProjectResponse(project))
  })

  test('Fail if a project does not exist', async () => {
    const project = ProjectMother.random()

    const query = new FindProjectByIdQuery(project.id.valueOf())

    expect(handler.handle(query)).rejects.toThrowError(ProjectNotFound)
  })
})