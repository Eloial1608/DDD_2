import { CardNotFound } from '@Core/Card/domain/Errors/CardNotFound'
import { CardRepository } from '@Core/Card/domain/CardRepository'
import { Id } from '@Core/Card/domain/ValueObjects/Id'

export class Deleter {
  constructor (private readonly repository: CardRepository) {}

  async run (id: Id) {
    const Card = await this.repository.find(id)

    if (!Card) throw new CardNotFound(id)

    const deletedCard = Card.delete()

    await this.repository.persist(deletedCard)
  }
}