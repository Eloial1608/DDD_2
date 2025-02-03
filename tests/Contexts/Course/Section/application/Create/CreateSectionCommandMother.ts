import { CreateSectionCommand } from "@Course/Section/application/Create/CreateSectionCommand";
import { Section } from "@Course/Section/domain/Section";

export class CreateSectionCommandMother{
    static create(
        id:string,
        courseId:string,
        title: string):CreateSectionCommand{
            return new CreateSectionCommand(
                id,
                courseId,
                title
            )
        }
    

        static fromAggregate(section:Section): CreateSectionCommand{
            return this.create(
                section.id.valueOf(),
                section.courseId.valueOf(),
                section.title.valueOf()
            )
        }
}