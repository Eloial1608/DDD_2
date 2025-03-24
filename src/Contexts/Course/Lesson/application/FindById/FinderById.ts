import { LessonRepository } from '@Course/Lesson/domain/LessonRepository'
import { Id } from '@Course/Lesson/domain/ValueObjects/Id'
import { Lesson } from '@Course/Lesson/domain/Lesson'
import { LessonNotFound } from '@Course/Lesson/domain/Errors/LessonNotFound'

export class FinderById {
  constructor (private readonly repository: LessonRepository) {}

  async find (id: Id): Promise<Lesson> {
    const lesson = await this.repository.find(id)

    if (!lesson) throw new LessonNotFound(id)

    return lesson
  }
}
