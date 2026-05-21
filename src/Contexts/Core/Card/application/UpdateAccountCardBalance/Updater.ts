import { CardRepository } from '@Core/Card/domain/CardRepository';
import { CardNotFound } from '@Core/Card/domain/Errors/CardNotFound';
import { Id } from '@Core/Card/domain/ValueObjects/Id';
import { Balance } from '@Core/Card/domain/ValueObjects/Balance';

export class Updater {
  constructor(private readonly repository: CardRepository) {}

  async run(
    id: Id,
    balance: Balance,
  ): Promise<void> {
    const card = await this.repository.find(id);
    if (!card) throw new CardNotFound(id);

    const updatedCard = card.UpdateAccountCardBalance(
      balance,
    );

    await this.repository.persist(updatedCard);
  }
}