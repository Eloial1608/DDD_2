import { SharedBalance } from "@Shared/domain/SharedValueObjects/Account/SharedBalance";

export class Balance extends SharedBalance {
  constructor(value: number) {
    if (value < 0) {
      throw new Error('Balance cannot be negative');
    }
    super(value);
  }
}