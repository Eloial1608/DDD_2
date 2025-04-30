import { Request, Response } from 'express'
import { Controller } from '../@types/Controller'
import { CommandBus } from '@Shared/domain/CommandBus/CommandBus'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { TokenDecoder } from '@Shared/domain/TokenDecoder/TokenDecoder'
import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
import { FindSpaceMembersByCriteriaQuery } from '@Course/SpaceMember/application/FindByCriteria/FindSpaceMembersByCriteriaQuery'
import { SpaceMemberCollectionResponse } from '@Course/SpaceMember/application/SpaceMemberCollectionResponse'
import { FindUsersByCriteriaQuery } from '@Course/User/application/FindByCriteria/FindUsersByCriteriaQuery'
import { UserCollectionResponse } from '@Course/User/application/UserCollectionResponse'
import { CreateCourseUserWhenNoPriceCommand } from '@Course/CourseUser/application/CreateWhenNoPrice/CreateCourseUserWhenNoPriceCommand'
import { FindCourseByIdQuery } from '@Course/Course/application/FindById/FindCourseByIdQuery'
import { CourseResponse } from '@Course/Course/application/CourseResponse'
import { FindSpaceByIdQuery } from '@Course/Space/application/FindById/FindSpaceByIdQuery'
import { SpaceResponse } from '@Course/Space/application/SpaceResponse'
import { AllowedAccessibilities } from '@Shared/domain/SharedValueObjects/Space/SharedAccessibility'

export class CourseUserPostController implements Controller {
  constructor (
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly decoder: TokenDecoder
  ) {}

  async run (req: Request, res: Response): Promise<Response> {
    try {
      if (!req.headers.authorization) return res.status(401).send()

      const data = await this.decoder.run(req.headers.authorization)

      const courseQuery = new FindCourseByIdQuery(req.body.courseId)

      const course = (await this.queryBus.ask<CourseResponse>(courseQuery)).response

      if (!course) return res.status(404).send()

      const user = await this.getUser(data.id, course.communityId)

      if (!user) return res.status(401).send()

      const spaceQuery = new FindSpaceByIdQuery(course.spaceId)

      const space = (await this.queryBus.ask<SpaceResponse>(spaceQuery)).response

      if (!space) return res.status(404).send()

      if (space.accessibility !== AllowedAccessibilities.PUBLIC) {
        if (!user.isAdmin && !user.isOwner) {
          const spaceMember = await this.getSpaceMember(user.id, course.communityId, space.id)

          if (!spaceMember) return res.status(401).send()
        }
      }

      const command = new CreateCourseUserWhenNoPriceCommand(
        req.params.id,
        user.id,
        course.id
      )

      await this.commandBus.dispatch(command)

      return res.status(201).send()
    } catch (e) {
      console.log(e)
      if (e instanceof CannotDecode) return res.status(401).send()

      return res.status(500).send()
    }
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
