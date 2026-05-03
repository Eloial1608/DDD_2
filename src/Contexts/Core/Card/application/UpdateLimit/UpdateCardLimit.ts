import { CardRepository } from '@Core/Card/domain/CardRepository';
import { CardNotFound } from '@Core/Card/domain/Errors/CardNotFound';
import { Id } from '@Core/Card/domain/ValueObjects/Id';
import { LimitCard } from '@Core/Card/domain/ValueObjects/LimitCard';

export class UpdateCardLimit {
  constructor(private readonly repository: CardRepository) {}

  async run(
    id: Id,
    limitCard: LimitCard
  ): Promise<void> {
    const card = await this.repository.find(id);
    if (!card) throw new CardNotFound(id);

    const updatedCard = card.updateLimit(limitCard);

    await this.repository.persist(updatedCard);
  }
}