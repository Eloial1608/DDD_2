/* eslint-disable no-trailing-spaces */
import { Request, Response } from 'express'
import { Controller } from '../@types/Controller'
import { CommandBus } from '@Shared/domain/CommandBus/CommandBus'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { TokenDecoder } from '@Shared/domain/TokenDecoder/TokenDecoder'
import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
import { FindCourseByIdQuery } from '@Course/Course/application/FindById/FindCourseByIdQuery'
import { CourseResponse } from '@Course/Course/application/CourseResponse'
import { FindUsersByCriteriaQuery } from '@Course/User/application/FindByCriteria/FindUsersByCriteriaQuery'
import { UserCollectionResponse } from '@Course/User/application/UserCollectionResponse'
import { CreateSectionCommand } from '@Course/Section/application/Create/CreateSectionCommand'
import { FindSpaceMembersByCriteriaQuery } from '@Course/SpaceMember/application/FindByCriteria/FindSpaceMembersByCriteriaQuery'
import { SpaceMemberCollectionResponse } from '@Course/SpaceMember/application/SpaceMemberCollectionResponse'

export class SectionPostController implements Controller {
  constructor (private readonly commandBus: CommandBus, private readonly queryBus: QueryBus, private readonly decoder: TokenDecoder) {}

  async run (req: Request, res: Response): Promise<Response> {
    try {
      if (!req.headers.authorization) return res.status(401).send()

      const data = await this.decoder.run(req.headers.authorization)

      const course = await this.getCourse(req.body.courseId)

      const user = await this.getUser(data.id, course.communityId)

      if (!user) return res.status(401).send()

      if (!user.isAdmin && !user.isOwner) {
        const spaceMember = await this.getSpaceMember(user.id, user.communityId, req.body.spaceId)
  
        if (!spaceMember) return res.status(401).send()
      }

      const command = new CreateSectionCommand(
        req.params.id,
        req.body.courseId,
        req.body.title
      )

      await this.commandBus.dispatch(command)

      return res.status(201).send()
    } catch (e) {
      console.log(e)
      if (e instanceof CannotDecode) return res.status(401).send()

      return res.status(500).send()
    }
  }

  private async getCourse (id: string) {
    const query = new FindCourseByIdQuery(id)

    const course = (await this.queryBus.ask<CourseResponse>(query)).response

    return course
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
  
    return (await this.queryBus.ask<SpaceMemberCollectionResponse>(query)).response
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
