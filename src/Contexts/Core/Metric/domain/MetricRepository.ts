import { Metric } from './Metric'

export interface MetricRepository {
    persist (metric: Metric): Promise<void>
}
