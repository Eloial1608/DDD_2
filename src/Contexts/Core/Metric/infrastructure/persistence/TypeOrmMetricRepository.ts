import { TypeOrmRepository } from '@Shared/infrastructure/persistence/typeorm/TypeOrmRepository'
import { EntitySchema } from 'typeorm'
import { MetricSchema } from './entity/MetricSchema'
import { Metric } from '@Core/Metric/domain/Metric'
import { MetricRepository } from '@Core/Metric/domain/MetricRepository'

export class TypeOrmMetricRepository extends TypeOrmRepository<Metric> implements MetricRepository {
  protected get entitySchema (): EntitySchema {
    return MetricSchema
  }

  async persist (metric: Metric): Promise<void> {
    await (await this.repository()).save(metric)
  }
}
