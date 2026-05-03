import { Card } from "@Core/Card/domain/Card"
import { CardRepository } from "@Core/Card/domain/CardRepository"
import { CardNotFound } from "@Core/Card/domain/Errors/CardNotFound"
import { Id } from "@Core/Card/domain/ValueObjects/Id"

export class FinderById {
  constructor (private readonly repository: CardRepository) {}

  async find (id: Id): Promise<Card> {
    const Card = await this.repository.find(id)

    if (!Card) throw new CardNotFound(id)

    return Card
  }
}
