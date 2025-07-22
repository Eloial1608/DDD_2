import { Request, Response } from 'express'
import { Controller } from '../@types/Controller'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { FindSpaceMembersByCriteriaQuery } from '@Projects/SpaceMember/application/FindByCriteria/FindSpaceMembersByCriteriaQuery'
import { SpaceMemberCollectionResponse } from '@Projects/SpaceMember/application/SpaceMemberCollectionResponse'
import { FindUsersByCriteriaQuery } from '@Projects/User/application/FindByCriteria/FindUsersByCriteriaQuery'
import { UserCollectionResponse } from '@Projects/User/application/UserCollectionResponse'
import { TokenDecoder } from '@Shared/domain/TokenDecoder/TokenDecoder'
import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
import { FindSpaceByIdQuery } from '@Projects/Space/application/FindById/FindSpaceByIdQuery'
import { SpaceResponse } from '@Projects/Space/application/SpaceResponse'
import { AllowedAccessibilities } from '@Shared/domain/SharedValueObjects/Space/SharedAccessibility'
import { ProjectNotFound } from '@Projects/Project/domain/Errors/ProjectNotFound'
import { FindProjectUsersByCriteriaQuery } from '@Projects/ProjectUser/application/FindByCriteria/FindProjectUsersByCriteriaQuery'
import { ProjectUserCollectionResponse } from '@Projects/ProjectUser/application/ProjectUserCollectionResponse'
import { SpaceMemberResponseBody } from '@Projects/SpaceMember/application/SpaceMemberResponse'
import { UserResponseBody } from '@Projects/User/application/UserResponse'
import { ProjectResponseBody } from '@Projects/Project/application/ProjectResponse'
import { buildCriteriaFromUri } from '@Shared/infrastructure/Criteria/BuildCriteriaFromUri'
import { ProjectCollectionResponse } from '@Projects/Project/application/ProjectCollectionResponse'
import { FindProjectsByCriteriaQuery } from '@Projects/Project/application/FindByCriteria/FindProjectsByCriteriaQuery'

export class ProjectsGetController implements Controller {
  constructor (private readonly queryBus: QueryBus, private readonly decoder: TokenDecoder) {}

  async run (req: Request, res: Response): Promise<Response> {
    try {
      const criteria = buildCriteriaFromUri(req.query.criteria as string)

      const query = new FindProjectsByCriteriaQuery(
        criteria.filters,
        criteria.inFilters,
        criteria.orderBy,
        criteria.orderType,
        criteria.limit,
        criteria.offset
      )

      const projects = (await this.queryBus.ask<ProjectCollectionResponse>(query)).response

      const projectToSend = []

      for (const project of projects) {
        const p = await this.filterProject(project, req.headers.authorization as string)
        if (p) projectToSend.push(p)
      }

      return res.status(200).json(projectToSend)
    } catch (e) {
      console.log(e)
      if (e instanceof CannotDecode) return res.status(401).send()
      if (e instanceof ProjectNotFound) return res.status(404).send(e.getMessage())

      return res.status(500).send()
    }
  }

  private async filterProject (project: ProjectResponseBody, token: string) {
    const spaceQuery = new FindSpaceByIdQuery(project.spaceId)

    const space = await (await this.queryBus.ask<SpaceResponse>(spaceQuery)).response
    let spaceMember: SpaceMemberResponseBody | undefined
    let user: UserResponseBody | undefined

    if (user == null && token) {
      const data = await this.decoder.run(token)

      const u = await this.getUser(data.id, project.communityId)

      user = u ?? undefined
    }

    if (space.accessibility !== AllowedAccessibilities.PUBLIC) {
      if (!user) return null

      if (!user.isAdmin && !user.isOwner) {
        spaceMember = await this.getSpaceMember(user.id, user.communityId, space.id)

        if (!spaceMember) return null
      }
    }

    if (!user?.isAdmin && !user?.isOwner && !spaceMember?.isModerator) {
      if (!spaceMember) return this.getProjectWithoutContent(project)
      const projectUser = await this.getProjectUser(spaceMember.userId, project.id)
      if (!projectUser) return this.getProjectWithoutContent(project)
    }

    return project
  }

  private getProjectWithoutContent (project: ProjectResponseBody) {
    return {
      ...project,
      data: undefined,
      isLocked: true
    }
  }

  private async getProjectUser (userId: string, projectId: string) {
    const query = new FindProjectUsersByCriteriaQuery([
      new Map<string, string>([
        ['field', 'userId'],
        ['operator', '='],
        ['value', userId]
      ]),
      new Map<string, string>([
        ['field', 'projectId'],
        ['operator', '='],
        ['value', projectId]
      ])
    ])

    const user = (await this.queryBus.ask<ProjectUserCollectionResponse>(query)).response.pop()

    return user
  }

  private async getSpaceMember (userId: string, communityId: string, spaceId: string) {
    const query = new FindSpaceMembersByCriteriaQuery([
      new Map<string, string>([
        ['field', 'userId'],
        ['operator', '='],
        ['value', userId]
      ]),
      new Map<string, string>([
        ['field', 'spaceId'],
        ['operator', '='],
        ['value', spaceId]
      ]),
      new Map<string, string>([
        ['field', 'communityId'],
        ['operator', '='],
        ['value', communityId]
      ])
    ])

    return (await this.queryBus.ask<SpaceMemberCollectionResponse>(query)).response.pop()
  }

  private async getUser (id: string, communityId: string) {
    const query = new FindUsersByCriteriaQuery([
      new Map<string, string>([
        ['field', 'mainId'],
        ['operator', '='],
        ['value', id]
      ]),
      new Map<string, string>([
        ['field', 'communityId'],
        ['operator', '='],
        ['value', communityId]
      ])
    ])

    const user = (await this.queryBus.ask<UserCollectionResponse>(query)).response.pop()

    return user
  }
}
