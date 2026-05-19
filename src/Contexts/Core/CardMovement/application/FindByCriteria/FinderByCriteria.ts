import { CardMovement } from "@Core/CardMovement/domain/CardMovement";
import { CardMovementRepository } from "@Core/CardMovement/domain/CardMovmentRepository";
import { Criteria } from "@Shared/domain/Criteria/Criteria";

export class FinderByCriteria {
  constructor(private readonly repository: CardMovementRepository) {}

  async find(criteria: Criteria): Promise<CardMovement[]> {
    return this.repository.search(criteria);
  }
}