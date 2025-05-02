import { UpdateSectionCommand } from '@Course/Section/application/Update/UpdateSectionCommand'
import { Section } from '@Course/Section/domain/Section'
import { Nullable } from '@Shared/domain/Nullable'

export class UpdateSectionCommandMother {
  static update (
    id: string,
    courseId: string,
    title: string,
    description: Nullable<string>
  ): UpdateSectionCommand {
    return new UpdateSectionCommand(
      id,
      courseId,
      title,
      description
    )
  }

  static fromAggregate (section: Section): UpdateSectionCommand {
    return this.update(
      section.id.valueOf(),
      section.courseId.valueOf(),
      section.title.valueOf(),
      section.description?.valueOf()
    )
  }
}
