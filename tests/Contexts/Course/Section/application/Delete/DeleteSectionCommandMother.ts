import { DeleteSectionCommand } from '@Course/Section/application/Delete/DeleteSectionCommand'
import { Section } from '@Course/Section/domain/Section'

export class DeleteSectionCommandMother {
  static delete (id: string, courseId: string): DeleteSectionCommand {
    return new DeleteSectionCommand(id, courseId)
  }

  static fromAggregate (section: Section): DeleteSectionCommand {
    return this.delete(
      section.id.valueOf(),
      section.courseId.valueOf()
    )
  }
}
