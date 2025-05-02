import { CreateSectionCommand } from '@Course/Section/application/Create/CreateSectionCommand'
import { Section } from '@Course/Section/domain/Section'
import { Nullable } from '@Shared/domain/Nullable'

export class CreateSectionCommandMother {
  static create (
    id:string,
    courseId:string,
    title: string,
    description: Nullable<string>
  ):CreateSectionCommand {
    return new CreateSectionCommand(
      id,
      courseId,
      title,
      description
    )
  }

  static fromAggregate (section:Section): CreateSectionCommand {
    return this.create(
      section.id.valueOf(),
      section.courseId.valueOf(),
      section.title.valueOf(),
      section.description?.valueOf()
    )
  }
}
