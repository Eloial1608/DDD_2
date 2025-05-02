import { CreateLessonCommand } from '@Course/Lesson/application/Create/CreateLessonCommand'
import { Lesson } from '@Course/Lesson/domain/Lesson'

export class CreateLessonCommandMother {
  static create (
    id: string,
    sectionId: string,
    title: string,
    content: string
  ): CreateLessonCommand {
    return new CreateLessonCommand(
      id,
      sectionId,
      title,
      content
    )
  }

  static fromAggregate (lesson: Lesson): CreateLessonCommand {
    return this.create(
      lesson.id.valueOf(),
      lesson.sectionId.valueOf(),
      lesson.title.valueOf(),
      lesson.content.valueOf()
    )
  }
}
