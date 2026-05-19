import { Id } from "@Core/Account/domain/ValueObjects/Id"
import { CardMovement } from "@Core/CardMovement/domain/CardMovement"
import { CardMovementRepository } from "@Core/CardMovement/domain/CardMovmentRepository"
import { Criteria } from "@Shared/domain/Criteria/Criteria"
import { TypeOrmRepository } from "@Shared/infrastructure/persistence/typeorm/TypeOrmRepository"
import { EntitySchema, Equal } from "typeorm"
import { Nullable } from "vitest"
import { CardMovementSchema } from "./entity/CardMovementSchema"

export class TypeOrmCardMovementRepository extends TypeOrmRepository<CardMovement> implements CardMovementRepository {
  protected get entitySchema (): EntitySchema {
    return CardMovementSchema
  }

  async find (id: Id): Promise<Nullable<CardMovement>> {
    return await (await this.repository()).findOneBy({ id: Equal(id) })
  }

  async search (criteria: Criteria): Promise<CardMovement[]> {
    return (await this.criteriaToQueryBuilder(criteria)).getMany()
  }

  async persist (CardMovement: CardMovement): Promise<void> {
    await (await this.repository()).save(CardMovement)
    
  }
}