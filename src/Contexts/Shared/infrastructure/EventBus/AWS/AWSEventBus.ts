import {
  CreateTopicCommand,
  PublishCommand,
  PublishCommandInput,
  SNSClient,
  SubscribeCommand
} from '@aws-sdk/client-sns'
import {
  CreateQueueCommand,
  DeleteMessageCommand,
  Message,
  ReceiveMessageCommand,
  ReceiveMessageCommandInput,
  SQSClient
} from '@aws-sdk/client-sqs'
import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { DomainEventSubscriber } from '@Shared/domain/EventBus/DomainEventSubscriber'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { AWSDomainEventJsonDeserializer } from '@Shared/infrastructure/EventBus/AWSDomainEventJsonDeserializer'
import { DomainEventMapping } from '@Shared/infrastructure/EventBus/DomainEventMapping'
import AWSEventBusConfig from '@Shared/infrastructure/EventBus/AWS/AWSEventBusConfig'

type AwsSdkConfig = {
  region: string
  credentials: {
    accessKeyId: string
    secretAccessKey: string
  }
  endpoint?: string
}

export class AWSEventBus implements EventBus {
  private snsClient: SNSClient
  private sqsClient: SQSClient
  private deserializer?: AWSDomainEventJsonDeserializer
  private subscribers: Map<string, Array<DomainEventSubscriber<DomainEvent>>>
  private readonly consumeQueueName: string
  private readonly accountId: string
  private nameParser = (name: string): string => `${this.config.env}-${name.replace(/\./g, '-')}`
  private config: AWSEventBusConfig

  constructor (config: AWSEventBusConfig) {
    this.consumeQueueName = config.consume_queue_name
    const sdkConfig = this.getAwsConfig(config)
    this.snsClient = new SNSClient(sdkConfig)
    this.sqsClient = new SQSClient(sdkConfig)

    this.subscribers = new Map()
    this.accountId = config.aws_account_id
    this.config = config
  }

  setDomainEventMapping (domainEventMapping: DomainEventMapping): void {
    this.deserializer = new AWSDomainEventJsonDeserializer(domainEventMapping)
  }

  async publish (events: DomainEvent[]): Promise<void> {
    const eventNames = [...DomainEvent.derived]

    if (eventNames.length === 0) {
      return
    }

    await Promise.all(
      events.map(async evt => {
        const name = evt.eventName
        const topic = eventNames.find(topic => topic === name)
        if (!topic) {
          return
        }

        const publishCommandInput: PublishCommandInput = {
          TopicArn: this.getARN(topic, 'sns'),
          MessageAttributes: {
            type: { DataType: 'String', StringValue: evt.eventName },
            occurred_on: { DataType: 'String', StringValue: evt.occurredOn.toString() },
            id: { DataType: 'String', StringValue: evt.eventId },
            aggregateId: { DataType: 'String', StringValue: evt.aggregateId }
          },
          Message: JSON.stringify(evt.toPrimitive())
        }

        await this.snsClient.send(new PublishCommand(publishCommandInput))

        console.log(`Published event ${evt.eventName}`)
      })
    )
  }

  addSubscribers (subscribers: Array<DomainEventSubscriber<DomainEvent>>): void {
    subscribers.forEach(subscriber => {
      this.addSubscriber(subscriber)
    })
  }

  private addSubscriber (subscriber: DomainEventSubscriber<DomainEvent>): void {
    subscriber.subscribedTo().forEach(event => {
      const eventName = event.EVENT_NAME

      if (!this.subscribers.has(eventName)) {
        this.subscribers.set(eventName, [])
      }
      this.subscribers.get(eventName)!.push(subscriber)
    })
  }

  async startPublisher (): Promise<void> {
    await this.createPublishTopics()
  }

  async start (): Promise<void> {
    if (!this.deserializer) {
      throw new Error('AWSEventBus has not being properly initialized, deserializer is missing')
    }

    await this.createPublishTopics()

    this.createConsumer()
  }

  private async createPublishTopics () {
    const eventNames = [...DomainEvent.derived].map(this.nameParser)
    console.info('Topics to be created:')
    await Promise.all(
      eventNames.map(async publishTopic => {
        console.info(publishTopic)
        return this.snsClient.send(new CreateTopicCommand({ Name: publishTopic })).catch((err: unknown) => {
          console.error(`Error while creating the topic ${publishTopic}`)
          console.error(err as Error)
        })
      })
    )
  }

  private async createConsumer () {
    const respCreate = await this.sqsClient.send(
      new CreateQueueCommand({
        QueueName: this.nameParser(this.consumeQueueName)
      })
    )
    if (!respCreate?.QueueUrl) {
      throw new Error('No queue url got from creation')
    }
    const queueUrl = respCreate.QueueUrl
    const eventNames = [...this.subscribers.keys()]
    console.info(`Queue created: ${queueUrl}`)

    await Promise.all(
      eventNames.map(async evtName => {
        console.info(`Queue subscribed to: ${this.getARN(evtName, 'sns')}`)
        return this.snsClient.send(
          new SubscribeCommand({
            Protocol: 'sqs',
            TopicArn: this.getARN(evtName, 'sns'),
            Endpoint: this.getARN(this.consumeQueueName, 'sqs')
          })
        ).catch((err: unknown) => {
          console.error(`Error while subscribing topic ${evtName} to queue ${this.consumeQueueName}`)
          console.error(err as Error)
        })
      })
    )

    while (true) {
      const paramsReceiveMessage: ReceiveMessageCommandInput = {
        QueueUrl: queueUrl,
        MaxNumberOfMessages: 10,
        WaitTimeSeconds: 20,
        MessageAttributeNames: ['All'],
        AttributeNames: ['All']
      }
      const data = await this.sqsClient.send(new ReceiveMessageCommand(paramsReceiveMessage))

      console.log(data?.Messages, queueUrl)

      await Promise.all((data?.Messages ?? []).map((msg: any) => this.consumeMessage(msg, queueUrl)))
    }
  }

  private async consumeMessage (message: Message, queueUrl: string) {
    const event = this.deserializer!.deserialize(message.Body!.toString())

    console.log('Consuming event')

    if (!event) return

    if (event.eventName === 'app.tacter.tacter.guide.v1.last-thirty-days-views-updated') {
      console.info('LastThirtyDaysViewsUpdated event received, deleting the message...')
      await this.sqsClient.send(new DeleteMessageCommand({ QueueUrl: queueUrl, ReceiptHandle: message.ReceiptHandle }))
      return
    }

    const subscribers = this.subscribers.get(event.eventName) ?? []

    try {
      await Promise.all(subscribers.map(s => s.on(event)))
      await this.sqsClient.send(new DeleteMessageCommand({ QueueUrl: queueUrl, ReceiptHandle: message.ReceiptHandle }))
    } catch (error: unknown) {
      console.error(`An error occurred while consuming the event ${event.eventName}`)
      console.error(JSON.stringify(event.toPrimitive()))
      console.error(error as Error)
    }
  }

  private getARN (resourceName: string, type: 'sqs' | 'sns') {
    const topic = this.nameParser(resourceName)
    return `arn:aws:${type}:${this.config.region}:${this.accountId}:${topic}`
  }

  private getAwsConfig (config: AWSEventBusConfig): AwsSdkConfig {
    const sdkConfig: AwsSdkConfig = {
      region: config.region,
      credentials: { accessKeyId: config.aws_access_key_id, secretAccessKey: config.aws_secret_access_key }
    }

    if (config.endpoint_url) {
      sdkConfig.endpoint = config.endpoint_url
    }

    return sdkConfig
  }
}
