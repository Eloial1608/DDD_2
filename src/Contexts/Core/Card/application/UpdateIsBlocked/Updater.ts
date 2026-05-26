import { CardRepository } from '@Core/Card/domain/CardRepository';
import { CardNotFound } from '@Core/Card/domain/Errors/CardNotFound';
import { Id } from '@Core/Card/domain/ValueObjects/Id';
import { IsBlocked } from '@Core/Card/domain/ValueObjects/IsBlocked';

export class Updater {
  constructor(private readonly repository: CardRepository) {}

  async run(
    id: Id,
    isBlocked: IsBlocked,
  ): Promise<void> {
    const card = await this.repository.find(id);
    if (!card) throw new CardNotFound(id);

    const updatedCard = card.UpdateIsBlocked(
      isBlocked
    );

    await this.repository.persist(updatedCard);
  }
}