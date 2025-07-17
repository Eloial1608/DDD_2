import { Request, Response } from 'express'
import { Controller } from '../@types/Controller'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { FindSpaceMembersByCriteriaQuery } from '@Projects/SpaceMember/application/FindByCriteria/FindSpaceMembersByCriteriaQuery'
import { SpaceMemberCollectionResponse } from '@Projects/SpaceMember/application/SpaceMemberCollectionResponse'
import { FindUsersByCriteriaQuery } from '@Projects/User/application/FindByCriteria/FindUsersByCriteriaQuery'
import { UserCollectionResponse } from '@Projects/User/application/UserCollectionResponse'
import { TokenDecoder } from '@Shared/domain/TokenDecoder/TokenDecoder'
import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
import { FindProjectByIdQuery } from '@Projects/Project/application/FindById/FindProjectByIdQuery'
import { FindSpaceByIdQuery } from '@Projects/Space/application/FindById/FindSpaceByIdQuery'
import { SpaceResponse } from '@Projects/Space/application/SpaceResponse'
import { AllowedAccessibilities } from '@Shared/domain/SharedValueObjects/Space/SharedAccessibility'
import { ProjectNotFound } from '@Projects/Project/domain/Errors/ProjectNotFound'
import { FindProjectUsersByCriteriaQuery } from '@Projects/ProjectUser/application/FindByCriteria/FindProjectUsersByCriteriaQuery'
import { ProjectUserCollectionResponse } from '@Projects/ProjectUser/application/ProjectUserCollectionResponse'
import { SpaceMemberResponseBody } from '@Projects/SpaceMember/application/SpaceMemberResponse'
import { UserResponseBody } from '@Projects/User/application/UserResponse'
import { ProjectResponse, ProjectResponseBody } from '@Projects/Project/application/ProjectResponse'

export class ProjectGetController implements Controller {
  constructor (private readonly queryBus: QueryBus, private readonly decoder: TokenDecoder) {}

  async run (req: Request, res: Response): Promise<Response> {
    try {
      const query = new FindProjectByIdQuery(req.params.id)

      const project = (await this.queryBus.ask<ProjectResponse>(query)).response

      const spaceQuery = new FindSpaceByIdQuery(project.spaceId)

      const space = await (await this.queryBus.ask<SpaceResponse>(spaceQuery)).response
      let spaceMember: SpaceMemberResponseBody | undefined
      let user: UserResponseBody | undefined

      if (req.headers.authorization) {
        const data = await this.decoder.run(req.headers.authorization)

        user = await this.getUser(data.id, project.communityId)
      }

      if (space.accessibility !== AllowedAccessibilities.PUBLIC) {
        if (!user) return res.status(401).send()

        if (!user.isAdmin && !user.isOwner) {
          spaceMember = await this.getSpaceMember(user.id, user.communityId, space.id)

          if (!spaceMember) return res.status(401).send()
        }
      }

      if ((!user?.isAdmin && !user?.isOwner && !spaceMember?.isModerator)) {
        if (!spaceMember) {
          return res.status(200).json(this.getProjectWithoutContent(project))
        }
        const projectUser = await this.getProjectUser(spaceMember.userId, project.id)
        if (!projectUser) {
          return res.status(200).json(this.getProjectWithoutContent(project))
        }
      }

      return res.status(200).json(project)
    } catch (e) {
      console.log(e)
      if (e instanceof CannotDecode) return res.status(401).send()
      if (e instanceof ProjectNotFound) return res.status(404).send(e.getMessage())

      return res.status(500).send()
    }
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
