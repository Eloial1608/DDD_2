import { CommentRepository } from '@Course/Comment/domain/CommentRepository'
import { Author } from '@Course/Comment/domain/ValueObjects/Author'
import { Content } from '@Course/Comment/domain/ValueObjects/Content'
import { Id } from '@Course/Comment/domain/ValueObjects/Id'
import { CourseId } from '@Course/Comment/domain/ValueObjects/CourseId'
import { UserId } from '@Course/Comment/domain/ValueObjects/UserId'
import { FindUsersByCriteriaQuery } from '@Course/User/application/FindByCriteria/FindUsersByCriteriaQuery'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { Comment } from '@Course/Comment/domain/Comment'
import { FindCourseByIdQuery } from '@Course/Course/application/FindById/FindCourseByIdQuery'
import { CourseResponse } from '@Course/Course/application/CourseResponse'
import { FindSpaceByIdQuery } from '@Course/Space/application/FindById/FindSpaceByIdQuery'
import { SpaceResponse } from '@Course/Space/application/SpaceResponse'
import { CourseConfiguration } from '@Shared/domain/SharedValueObjects/Space/Configuration/CourseConfiguration'
import { UserCollectionResponse } from '@Course/User/application/UserCollectionResponse'

export class Creator {
  constructor (private readonly repository: CommentRepository, private readonly eventBus: EventBus, private readonly queryBus: QueryBus) {}

  async run (
    id: Id,
    courseId: CourseId,
    userId: UserId,
    content: Content
  ) {
    const existing = await this.repository.find(id)

    if (existing) return

    const user = await this.findUserById(userId)

    if (!user) return

    const course = await this.findCourseById(courseId)
    const space = await this.findSpaceById(course.spaceId)

    if (!(space.configuration as CourseConfiguration['configuration']).allowsComments) return

    const comment = Comment.create(
      id,
      courseId,
      userId,
      new Author(
        user.id,
        user.mainId,
        user.name,
        user.username,
        user.pictureUrl,
        user.bannerUrl
      ),
      content
    )

    await this.repository.persist(comment)
    await this.eventBus.publish(comment.pullDomainEvents())
  }

  private async findUserById (id: UserId) {
    const userQuery = new FindUsersByCriteriaQuery([
      new Map<string, string>([
        ['field', 'id'],
        ['operator', '='],
        ['value', id.valueOf()]
      ])
    ])

    return (await this.queryBus.ask<UserCollectionResponse>(userQuery)).response.pop()
  }

  private async findCourseById (courseId: CourseId) {
    const query = new FindCourseByIdQuery(courseId.valueOf())

    return (await this.queryBus.ask<CourseResponse>(query)).response
  }

  private async findSpaceById (id: string) {
    const spaceQuery = new FindSpaceByIdQuery(id)

    return (await this.queryBus.ask<SpaceResponse>(spaceQuery)).response
  }
}
