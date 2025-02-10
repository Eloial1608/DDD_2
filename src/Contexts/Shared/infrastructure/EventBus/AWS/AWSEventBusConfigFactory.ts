import AWSEventBusConfig from './AWSEventBusConfig'

export class AWSEventBusConfigFactory {
  static createConfig (): AWSEventBusConfig {
    return {
      endpoint_url: process.env.ENDPOINT_URL ?? null,
      aws_account_id: process.env.AWS_ACCOUNT_ID!,
      aws_access_key_id: process.env.AWS_ACCESS_KEY_ID!,
      aws_secret_access_key: process.env.AWS_SECRET_ACCESS_KEY!,
      consume_queue_name: process.env.AWS_CONSUME_QUEUE_NAME!,
      region: process.env.AWS_REGION!,
      env: process.env.NODE_ENV!
    }
  }
}
