import { DeleteLessonCommand } from '@Course/Lesson/application/Delete/DeleteLessonCommand'
import { Lesson } from '@Course/Lesson/domain/Lesson'

export class DeleteLessonCommandMother {
  static delete (id: string, sectionId: string): DeleteLessonCommand {
    return new DeleteLessonCommand(id, sectionId)
  }

  static fromAggregate (lesson: Lesson): DeleteLessonCommand {
    return this.delete(
      lesson.id.valueOf(),
      lesson.sectionId.valueOf()
    )
  }
}
