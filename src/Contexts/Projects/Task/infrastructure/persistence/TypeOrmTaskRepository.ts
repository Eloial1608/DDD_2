import { Task } from '@Projects/Task/domain/Task'
import { TaskRepository } from '@Projects/Task/domain/TaskRepository'
import { TypeOrmRepository } from '@Shared/infrastructure/persistence/typeorm/TypeOrmRepository'
import { EntitySchema, Equal } from 'typeorm'
import { TaskSchema } from './entity/TaskSchema'
import { Id } from '@Projects/Task/domain/ValueObjects/Id'
import { Nullable } from '@Shared/domain/Nullable'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export class TypeOrmTaskRepository extends TypeOrmRepository<Task> implements TaskRepository {
  protected get entitySchema (): EntitySchema {
    return TaskSchema
  }

  async find (id: Id): Promise<Nullable<Task>> {
    return await (await this.repository()).findOneBy({ id: Equal(id) })
  }

  async search (criteria: Criteria): Promise<Task[]> {
    return (await this.criteriaToQueryBuilder(criteria)).getMany()
  }

  async persist (task: Task): Promise<void> {
    await (await this.repository()).save(task)
  }

  async delete (task: Task): Promise<void> {
    await (await this.repository()).remove(task)
  }
}
