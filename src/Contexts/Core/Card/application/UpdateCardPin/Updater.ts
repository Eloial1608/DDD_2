import { CardRepository } from '@Core/Card/domain/CardRepository';
import { CardNotFound } from '@Core/Card/domain/Errors/CardNotFound';
import { Id } from '@Core/Card/domain/ValueObjects/Id';
import { CardPin } from '../../domain/ValueObjects/CardPin';

export class Updater {
  constructor(private readonly repository: CardRepository) {}

  async run(
    id: Id,
    cardPin: CardPin,
  ): Promise<void> {
    const card = await this.repository.find(id);
    if (!card) throw new CardNotFound(id);

    const updatedCard = card.UpdateAccountCardPin(
      cardPin,
    );

    await this.repository.persist(updatedCard);
  }
}