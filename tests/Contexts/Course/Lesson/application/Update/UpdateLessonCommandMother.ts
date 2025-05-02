import { UpdateLessonCommand } from '@Course/Lesson/application/Update/UpdateLessonCommand'
import { Lesson } from '@Course/Lesson/domain/Lesson'

export class UpdateLessonCommandMother {
  static update (
    id: string,
    courseId: string,
    title: string,
    content: string,
    order: number
  ): UpdateLessonCommand {
    return new UpdateLessonCommand(
      id,
      courseId,
      title,
      content,
      order
    )
  }

  static fromAggregate (lesson: Lesson): UpdateLessonCommand {
    return this.update(
      lesson.id.valueOf(),
      lesson.sectionId.valueOf(),
      lesson.title.valueOf(),
      lesson.content.valueOf(),
      lesson.order.valueOf()
    )
  }
}
