import { Theme } from '@Core/Theme/domain/Theme'
import { ThemeRepository } from '@Core/Theme/domain/ThemeRepository'
import { TypeOrmRepository } from '@Shared/infrastructure/persistence/typeorm/TypeOrmRepository'
import { EntitySchema, Equal } from 'typeorm'
import { ThemeSchema } from './entity/ThemeSchema'
import { Id } from '@Core/Theme/domain/ValueObjects/Id'
import { Nullable } from '@Shared/domain/Nullable'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export class TypeOrmThemeRepository extends TypeOrmRepository<Theme> implements ThemeRepository {
  protected get entitySchema (): EntitySchema {
    return ThemeSchema
  }

  async find (id: Id): Promise<Nullable<Theme>> {
    return await (await this.repository()).findOneBy({ id: Equal(id) })
  }

  async search (criteria: Criteria): Promise<Theme[]> {
    return (await this.criteriaToQueryBuilder(criteria)).getMany()
  }

  async persist (theme: Theme): Promise<void> {
    await (await this.repository()).save(theme)
  }

  async delete (theme: Theme): Promise<void> {
    await (await this.repository()).remove(theme)
  }
}
