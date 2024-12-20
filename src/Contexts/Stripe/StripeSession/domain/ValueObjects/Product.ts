import { Nullable } from '@Shared/domain/Nullable'

export class Product {
  constructor (
        readonly id: string,
        readonly type: string,
        readonly priceId: string,
        readonly renovationInterval?: Nullable<number>,
        readonly renovationType?: Nullable<string>
  ) {}

  toPrimitives () {
    return {
      id: this.id,
      type: this.type,
      priceId: this.priceId,
      renovationInterval: this.renovationInterval,
      renovationType: this.renovationType
    }
  }
}
