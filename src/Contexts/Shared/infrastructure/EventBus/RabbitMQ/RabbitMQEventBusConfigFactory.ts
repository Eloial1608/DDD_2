import RabbitMQEventBusConfig from './RabbitMQEventBusConfig'

export class RabbitMQEventBusConfigFactory {
  static createConfig (): RabbitMQEventBusConfig {
    return {
      hostname: process.env.RABBITMQ_HOSTNAME!,
      user: process.env.RABBITMQ_USER!,
      password: process.env.RABBITMQ_PASSWORD!,
      port: Number(process.env.RABBITMQ_PORT!),
      queue_name: process.env.RABBITMQ_QUEUE_NAME!,
      env: process.env.NODE_ENV!,
      protocol: process.env.RABBITMQ_PROTOCOL!,
      vhost: process.env.RABBITMQ_VHOST!
    }
  }
}
