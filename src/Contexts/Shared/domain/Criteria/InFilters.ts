import { InFilter, InFilterPrimitives } from '@Shared/domain/Criteria/InFilter'

export class InFilters {
  constructor (readonly filters: InFilter[]) {}

  static none (): InFilters {
    return new InFilters([])
  }

  static fromPrimitives (primitives: Array<InFilterPrimitives>): InFilters {
    return new InFilters(primitives.map(p => InFilter.fromPrimitives(p)))
  }
}
