import { EntitySchema } from 'typeorm'
import { Metric } from '@Core/Metric/domain/Metric'

export const MetricSchema = new EntitySchema<Metric>({
  name: 'Metric',
  target: Metric,
  tableName: 'metric',
  columns: {
    id: {
      type: String,
      primary: true
    },
    type: {
      type: String
    },
    date: {
      type: Date
    }
  }
})
