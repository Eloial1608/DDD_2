import { UpdateSectionCommand } from '@Course/Section/application/Update/UpdateSectionCommand'
import { Section } from '@Course/Section/domain/Section'

export class UpdateSectionCommandMother {
  static update (
    id: string,
    courseId: string,
    title: string
  ): UpdateSectionCommand {
    return new UpdateSectionCommand(
      id,
      courseId,
      title
    )
  }

  static fromAggregate (section: Section): UpdateSectionCommand {
    return this.update(
      section.id.valueOf(),
      section.courseId.valueOf(),
      section.title.valueOf()
    )
  }
}
