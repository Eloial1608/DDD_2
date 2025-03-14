import { Request, Response } from 'express'
import { Controller } from '../@types/Controller'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { TokenDecoder } from '@Shared/domain/TokenDecoder/TokenDecoder'
import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
import { CourseResponse, CourseResponseBody } from '@Course/Course/application/CourseResponse'
import { FindCourseByIdQuery } from '@Course/Course/application/FindById/FindCourseByIdQuery'
import { CourseNotFound } from '@Course/Course/domain/Errors/CourseNotFound'
import { buildCriteriaFromUri } from '@Shared/infrastructure/Criteria/BuildCriteriaFromUri'
import { FindSectionsByCriteriaQuery } from '@Course/Section/application/FindByCriteria/FindSectionsByCriteriaQuery'
import { SectionCollectionResponse } from '@Course/Section/application/SectionCollectionResponse'
import { SpaceResponse } from '@Course/Space/application/SpaceResponse'
import { FindSpaceByIdQuery } from '@Course/Space/application/FindById/FindSpaceByIdQuery'
import { SpaceMemberResponseBody } from '@Course/SpaceMember/application/SpaceMemberResponse'
import { UserResponseBody } from '@Course/User/application/UserResponse'
import { AllowedAccessibilities } from '@Shared/domain/SharedValueObjects/Space/SharedAccessibility'
import { FindSpaceMembersByCriteriaQuery } from '@Course/SpaceMember/application/FindByCriteria/FindSpaceMembersByCriteriaQuery'
import { SpaceMemberCollectionResponse } from '@Course/SpaceMember/application/SpaceMemberCollectionResponse'
import { FindUsersByCriteriaQuery } from '@Course/User/application/FindByCriteria/FindUsersByCriteriaQuery'
import { UserCollectionResponse } from '@Course/User/application/UserCollectionResponse'

export class CourseGetController implements Controller {
  constructor (private readonly queryBus: QueryBus, private readonly decoder: TokenDecoder) {}

  async run (req: Request, res: Response): Promise<Response> {
    try {
      const criteria = buildCriteriaFromUri(req.query.criteria as string)

      if (!criteria.filters?.find(x => x.get('field') === 'courseId')?.get('value')) return res.status(400).send()

      const courseQuery = new FindCourseByIdQuery(criteria.filters!.find(x => x.get('field') === 'courseId')!.get('value') as string)

      const course = (await this.queryBus.ask<CourseResponse>(courseQuery)).response

      const query = new FindSectionsByCriteriaQuery(
        criteria.filters,
        criteria.inFilters,
        criteria.orderBy,
        criteria.orderType,
        criteria.limit,
        criteria.offset
      )

      const sections = (await this.queryBus.ask<SectionCollectionResponse>(query)).response

      const canAccess = await this.canAccess(course, req.headers.authorization as string)

      if (!canAccess) return res.status(401).send()

      return res.status(200).json(sections)
    } catch (e) {
      console.log(e)
      if (e instanceof CannotDecode) return res.status(401).send()
      if (e instanceof CourseNotFound) return res.status(404).send(e.getMessage())

      return res.status(500).send()
    }
  }

  private async canAccess (course: CourseResponseBody, token: string): Promise<boolean> {
    const spaceQuery = new FindSpaceByIdQuery(course.spaceId)

    const space = await (await this.queryBus.ask<SpaceResponse>(spaceQuery)).response
    let spaceMember: SpaceMemberResponseBody | undefined
    let user: UserResponseBody | undefined

    if (user == null && token) {
      const data = await this.decoder.run(token)

      const u = await this.getUser(data.id, course.communityId)

      user = u ?? undefined
    }

    if (space.accessibility !== AllowedAccessibilities.PUBLIC) {
      if (!user) return false

      if (!user.isAdmin && !user.isOwner) {
        spaceMember = await this.getSpaceMember(user.id, user.communityId, space.id)

        if (!spaceMember) return false
      }
    }

    if (course.isPaid && (!user?.isAdmin && !user?.isOwner && !spaceMember?.isModerator)) {
      if (!spaceMember) return false
      const courseUser = await this.getCourseUser(spaceMember.userId, course.id)
      if (!courseUser) return false
    }

    return true
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

  private async getCourseUser (userId: string, courseId: string) {
    const query = new FindCourseUsersByCriteriaQuery([
      new Map<string, string>([
        ['field', 'userId'],
        ['operator', '='],
        ['value', userId]
      ]),
      new Map<string, string>([
        ['field', 'courseId'],
        ['operator', '='],
        ['value', courseId]
      ])
    ])

    const user = (await this.queryBus.ask<CourseUserCollectionResponse>(query)).response.pop()

    return user
  }
}
