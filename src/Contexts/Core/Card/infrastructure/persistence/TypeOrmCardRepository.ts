import { Card } from '@Core/Card/domain/Card'
import { CardRepository } from '@Core/Card/domain/CardRepository'
import { TypeOrmRepository } from '@Shared/infrastructure/persistence/typeorm/TypeOrmRepository'
import { EntitySchema, Equal } from 'typeorm'
import { Nullable } from '@Shared/domain/Nullable'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { CardSchema } from './entity/CardSchema'
import { Id } from '@Core/Card/domain/ValueObjects/Id'

export class TypeOrmCardRepository extends TypeOrmRepository<Card> implements CardRepository {
  protected get entitySchema (): EntitySchema {
    return CardSchema
  }

  async find (id: Id): Promise<Nullable<Card>> {
    return await (await this.repository()).findOneBy({ id: Equal(id) })
  }

  async search (criteria: Criteria): Promise<Card[]> {
    return (await this.criteriaToQueryBuilder(criteria)).getMany()
  }

  async persist (Card: Card): Promise<void> {
    await (await this.repository()).save(Card)
    
  }
}
