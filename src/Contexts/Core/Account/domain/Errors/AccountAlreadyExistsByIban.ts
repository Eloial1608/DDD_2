import { DomainError } from '@Shared/domain/Errors/DomainError';
import { Iban } from '../ValueObjects/Iban';

export class AccountAlreadyExistsByIban extends DomainError {
  protected code = 'Account-already-exists-by-iban';
  protected message: string;

  constructor(iban: Iban) {
    super();
    this.message = `An Account with IBAN ${iban} already exists`;
  }
}