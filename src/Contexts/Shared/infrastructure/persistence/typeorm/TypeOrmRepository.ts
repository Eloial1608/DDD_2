import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { FilterOperator, Operator } from '@Shared/domain/Criteria/FilterOperator'
import { FilterValue } from '@Shared/domain/Criteria/FilterValue'
import { Nullable } from '@Shared/domain/Nullable'
import { DataSource, Repository, SelectQueryBuilder } from 'typeorm'
import { EntitySchema } from 'typeorm/entity-schema/EntitySchema'
import { InFilterOperator, Operator as InOperator } from '@Shared/domain/Criteria/InFilterOperator'
import { Filters } from '@Shared/domain/Criteria/Filters'
import { InFilters } from '@Shared/domain/Criteria/InFilters'
import { OrderTypes } from '@Shared/domain/Criteria/OrderType'
import { Order } from '@Shared/domain/Criteria/Order'

export abstract class TypeOrmRepository<T extends AggregateRoot> {
  constructor (protected readonly connection: Promise<DataSource>) {}

  protected abstract get entitySchema(): EntitySchema;

  protected async repository (): Promise<Repository<T>> {
    const connection = await this.connection
    return connection.getRepository<T>(this.entitySchema)
  }

  protected async persist (aggregateRoot: T): Promise<void> {
    const repository = await this.repository()
    await repository.save(aggregateRoot as any, { reload: false })
  }

  protected async remove (aggregateRoot: T): Promise<void> {
    const repository = await this.repository()
    await repository.softRemove(aggregateRoot as any, { reload: false })
  }

  protected async criteriaToQueryBuilder (criteria: Criteria): Promise<SelectQueryBuilder<T>> {
    const repository = await this.repository()
    const queryBuilder = repository.createQueryBuilder().select()

    this.addFiltersToQueryBuilder(criteria.filters, queryBuilder)
    this.addInFiltersToQueryBuilder(criteria.inFilters, queryBuilder)

    if (criteria.order) {
      const orders = Order.asArray(criteria.order)

      for (const order of orders) {
        if (order.orderType.valueOf() !== OrderTypes.NONE) {
          queryBuilder.addOrderBy(
            String(`"${order.orderBy}"`),
                String(order.orderType).toUpperCase() as 'ASC' | 'DESC'
          )
        }
      }
    }

    queryBuilder.limit(criteria?.limit)
    queryBuilder.offset(criteria?.offset)

    return queryBuilder
  }

  private addInFiltersToQueryBuilder (inFilters: InFilters | undefined, queryBuilder: SelectQueryBuilder<T>) {
    const filterMap = new Map()
    inFilters?.filters.forEach(filter => {
      if (filter.values.length > 0) {
        if (filterMap.has(filter.field)) {
          filterMap.get(filter.field).push(this.convertInValues(filter.values))
        } else {
          filterMap.set(filter.field, this.convertInValues(filter.values))
        }
      }
    })

    filterMap.forEach((values, field) => {
      queryBuilder.andWhere(`"${field}" IN (:...${field})`, { [field]: values })
    })
  }

  private convertInValues (values: FilterValue[]): (string | number | boolean)[] {
    if (values.length === 0) return []
    if (!isNaN(Number(values[0].valueOf()))) return values.filter(x => !isNaN(Number(x.valueOf()))).map(x => Number(x.valueOf()))
    if (
      typeof values[0].valueOf() === 'string' &&
      ['false', 'true'].includes((values[0].valueOf() as string).toLowerCase())) {
      return values.map(x => (x.valueOf() as string).toLowerCase() === 'true')
    }

    return values.map(x => x.valueOf()) as string[]
  }

  private addFiltersToQueryBuilder (filters: Filters | undefined, queryBuilder: SelectQueryBuilder<T>) {
    filters?.filters.forEach((filter) => {
      const field = String(filter.field)
      const operator = TypeOrmRepository.mapFilterOperatorToDatabaseOperator(filter.operator, filter.value)
      const value = TypeOrmRepository.prepareValue(filter.operator, filter.value)
      if (value == null) {
        queryBuilder.andWhere(`"${field}" ${operator} NULL`)
      } else {
        queryBuilder.andWhere(`"${field}" ${operator} :${field}`, {
          [field]: value
        })
      }
    })
  }

  protected static mapFilterOperatorToDatabaseOperator (
    operator: FilterOperator,
    value: Nullable<FilterValue>
  ): string {
    const customMap = {
      [String(Operator.CONTAINS)]: 'ILIKE',
      [String(Operator.NOT_CONTAINS)]: 'NOT ILIKE'
    }

    const nullCustomMap = {
      [String(Operator.EQUAL)]: 'IS',
      [String(Operator.CONTAINS)]: 'IS',
      [String(Operator.NOT_EQUAL)]: 'IS NOT',
      [String(Operator.NOT_CONTAINS)]: 'IS NOT'
    }

    return value === null
      ? nullCustomMap?.[operator.valueOf()] ?? operator.valueOf()
      : customMap?.[operator.valueOf()] ?? operator.valueOf()
  }

  protected static mapInFilterOperatorToDatabaseOperator (operator: InFilterOperator): string {
    const customMap = {
      [String(InOperator.IN)]: 'IN',
      [String(InOperator.NOT_IN)]: 'NOT IN'
    }

    return customMap[operator.valueOf()]
  }

  protected static prepareValue (operator: FilterOperator, value: Nullable<FilterValue>): Nullable<string> {
    if (operator.isContainsOrNotContains()) {
      return `%${String(value)}%`
    }

    if (!value) {
      return value
    }

    return value.valueOf().toString()
  }

  protected static prepareValues (values: FilterValue[]): string {
    return `(${values.map(v => `'${v}'`).join(',')})`
  }
}
