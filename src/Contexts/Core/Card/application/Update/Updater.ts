import { CardRepository } from '@Core/Card/domain/CardRepository';
import { CardNotFound } from '@Core/Card/domain/Errors/CardNotFound';
import { Id } from '@Core/Card/domain/ValueObjects/Id';
import { CardPin } from '@Core/Card/domain/ValueObjects/CardPin';
import { Balance } from '@Core/Card/domain/ValueObjects/Balance';
import { LimitCard } from '@Core/Card/domain/ValueObjects/LimitCard';

export class Updater {
  constructor(private readonly repository: CardRepository) {}

  async run(
    id: Id,
    balance: Balance,
    limitCard: LimitCard,
    cardPin: CardPin,
  ): Promise<void> {
    const card = await this.repository.find(id);
    if (!card) throw new CardNotFound(id);

    const updatedCard = card.update(
      balance,
      limitCard,
      cardPin
    );

    await this.repository.persist(updatedCard);
  }
}