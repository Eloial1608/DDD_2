import { Request, Response } from 'express'
import { Controller } from '../@types/Controller'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { TokenDecoder } from '@Shared/domain/TokenDecoder/TokenDecoder'
import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
import { FindLessonByIdQuery } from '@Course/Lesson/application/FindById/FindLessonByIdQuery'
import { LessonResponse, LessonResponseBody } from '@Course/Lesson/application/LessonResponse'
import { LessonNotFound } from '@Course/Lesson/domain/Errors/LessonNotFound'
import { FindCourseByIdQuery } from '@Course/Course/application/FindById/FindCourseByIdQuery'
import { CourseResponse } from '@Course/Course/application/CourseResponse'
import { FindSpaceByIdQuery } from '@Course/Space/application/FindById/FindSpaceByIdQuery'
import { SpaceResponse } from '@Course/Space/application/SpaceResponse'
import { SpaceMemberResponseBody } from '@Course/SpaceMember/application/SpaceMemberResponse'
import { UserResponseBody } from '@Course/User/application/UserResponse'
import { FindUsersByCriteriaQuery } from '@Course/User/application/FindByCriteria/FindUsersByCriteriaQuery'
import { SpaceMemberCollectionResponse } from '@Course/SpaceMember/application/SpaceMemberCollectionResponse'
import { FindSpaceMembersByCriteriaQuery } from '@Course/SpaceMember/application/FindByCriteria/FindSpaceMembersByCriteriaQuery'
import { AllowedAccessibilities } from '@Shared/domain/SharedValueObjects/Space/SharedAccessibility'
import { UserCollectionResponse } from '@Course/User/application/UserCollectionResponse'
import { FindCourseUsersByCriteriaQuery } from '@Course/CourseUser/application/FindByCriteria/FindCourseUsersByCriteriaQuery'
import { CourseUserCollectionResponse } from '@Course/CourseUser/application/CourseUserCollectionResponse'
import { FindSectionByIdQuery } from '@Course/Section/application/FindById/FindSectionByIdQuery'
import { SectionResponse } from '@Course/Section/application/SectionResponse'

type LessonGetControllerResponseBody = {
  readonly id: string
  readonly sectionId: string
  readonly title: string
  readonly type: string
  readonly content: string
  isLocked: boolean
  readonly createdAt: Date
  readonly updatedAt: Date
}

export class LessonGetController implements Controller {
  constructor (private readonly queryBus: QueryBus, private readonly decoder: TokenDecoder) {}

  async run (req: Request, res: Response): Promise<Response> {
    try {
      if (!req.headers.authorization) return res.status(401).send()

      await this.decoder.run(req.headers.authorization)

      const query = new FindLessonByIdQuery(req.params.id)
      const lesson = (await this.queryBus.ask<LessonResponse>(query)).response

      const sectionQuery = new FindSectionByIdQuery(lesson.sectionId)
      const section = (await this.queryBus.ask<SectionResponse>(sectionQuery)).response

      const courseQuery = new FindCourseByIdQuery(section.courseId)
      const course = (await this.queryBus.ask<CourseResponse>(courseQuery)).response

      const spaceQuery = new FindSpaceByIdQuery(course.spaceId)

      const space = await (await this.queryBus.ask<SpaceResponse>(spaceQuery)).response
      let spaceMember: SpaceMemberResponseBody | undefined
      let user: UserResponseBody | undefined

      if (req.headers.authorization) {
        const data = await this.decoder.run(req.headers.authorization)

        user = await this.getUser(data.id, course.communityId)
      }

      if (space.accessibility !== AllowedAccessibilities.PUBLIC) {
        if (!user) return res.status(401).send()

        if (!user.isAdmin && !user.isOwner) {
          spaceMember = await this.getSpaceMember(user.id, user.communityId, space.id)

          if (!spaceMember) return res.status(401).send()
        }
      }

      if (course.isPaid && (!user?.isAdmin && !user?.isOwner && !spaceMember?.isModerator)) {
        if (!spaceMember) return res.status(200).json(await this.buildResponse(this.getLessonWithoutContent(lesson)))
        const courseUser = await this.getCourseUser(spaceMember.userId, course.id)
        if (!courseUser) return res.status(200).json(await this.buildResponse(this.getLessonWithoutContent(lesson)))
      }

      return res.status(200).json(await this.buildResponse(lesson))
    } catch (e) {
      console.log(e)
      if (e instanceof LessonNotFound) return res.status(404).json({ message: e.getMessage() })

      if (e instanceof CannotDecode) return res.status(401).json({ message: e.getMessage() })

      return res.status(500).send()
    }
  }

  private getLessonWithoutContent (lesson: LessonResponseBody) {
    const { content, ...data } = lesson

    return {
      ...data,
      isLocked: true
    }
  }

  private async buildResponse (lesson: Partial<LessonGetControllerResponseBody>) : Promise<LessonGetControllerResponseBody> {
    return {
      ...lesson as LessonGetControllerResponseBody
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
        ['field', 'postId'],
        ['operator', '='],
        ['value', courseId]
      ])
    ])

    const courseUser = (await this.queryBus.ask<CourseUserCollectionResponse>(query)).response.pop()

    return courseUser
  }
}
