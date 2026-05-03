import { DomainError } from '@Shared/domain/Errors/DomainError';
import { Iban } from '../ValueObjects/Iban';

export class ThrowErrorForInvalidValue extends DomainError {
  protected code = 'Account-invalid-iban';
  protected message: string;

  constructor(iban: Iban) {
    super();
    this.message = `Invalid Iban ${iban}`;
  }
}