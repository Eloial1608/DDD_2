import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { DomainEventSubscriber } from '@Shared/domain/EventBus/DomainEventSubscriber'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { RabbitMQDomainEventJsonDeserializer } from '@Shared/infrastructure/EventBus/RabbitMQDomainEventJsonDeserializer'
import { DomainEventMapping } from '@Shared/infrastructure/EventBus/DomainEventMapping'
import RabbitMQEventBusConfig from '@Shared/infrastructure/EventBus/RabbitMQ/RabbitMQEventBusConfig'
import { Channel, Connection, connect } from 'amqplib'

export class RabbitMQEventBus implements EventBus {
  private rabbitMQClient: Connection | undefined
  private rabbitMQChannel: Channel | undefined
  private deserializer?: RabbitMQDomainEventJsonDeserializer
  private subscribers: Map<string, Array<DomainEventSubscriber<DomainEvent>>>
  private consumeQueueName: string
  private nameParser = (name: string): string => `${this.config.env}-` + name.replace(/\./g, '-')
  private config: RabbitMQEventBusConfig

  constructor (config: RabbitMQEventBusConfig) {
    this.consumeQueueName = config.queue_name
    this.subscribers = new Map()
    this.config = config
  }

  setDomainEventMapping (domainEventMapping: DomainEventMapping): void {
    this.deserializer = new RabbitMQDomainEventJsonDeserializer(domainEventMapping)
  }

  async publish (events: DomainEvent[]): Promise<void> {
    const eventNames = [...DomainEvent.derived]

    if (eventNames.length === 0) {
      return
    }

    if (!this.rabbitMQChannel) {
      setTimeout(() => this.publish(events), 5000)
      return
    }

    await Promise.all(
      events.map(async evt => {
        const name = evt.eventName
        const topic = eventNames.find(topic => topic === name)

        if (!topic) {
          return
        }

        const message = {
          topic: this.nameParser(topic),
          MessageAttributes: {
            type: { DataType: 'String', StringValue: evt.eventName },
            occurred_on: { DataType: 'String', StringValue: evt.occurredOn.toString() },
            id: { DataType: 'String', StringValue: evt.eventId },
            aggregateId: { DataType: 'String', StringValue: evt.aggregateId }
          },
          Message: JSON.stringify(evt.toPrimitive())
        }

        console.log(`${name} event published`)

        await this.rabbitMQChannel!.publish(this.nameParser(topic), this.nameParser(topic), Buffer.from(JSON.stringify(message)))
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

  async start (): Promise<void> {
    this.rabbitMQClient = await connect({
      hostname: this.config.hostname,
      port: this.config.port,
      username: this.config.user,
      password: this.config.password,
      protocol: this.config.protocol,
      vhost: this.config.vhost
    })

    console.log('Initializing rabbitMQClient')
    this.rabbitMQChannel = await this.rabbitMQClient.createChannel()
    console.log('Initialized')

    if (!this.deserializer || !this.rabbitMQClient || !this.rabbitMQChannel) {
      throw new Error('RabbitMQBus has not being properly initialized, deserializer is missing')
    }

    await this.createPublishTopics()

    await this.createConsumer()
  }

  async startPublisher (): Promise<void> {
    this.rabbitMQClient = await connect({
      hostname: this.config.hostname,
      port: this.config.port,
      username: this.config.user,
      password: this.config.password,
      protocol: this.config.protocol,
      vhost: this.config.vhost
    })

    console.log('Initializing rabbitMQClient')
    this.rabbitMQChannel = await this.rabbitMQClient.createChannel()
    console.log('Initialized')

    if (!this.rabbitMQClient || !this.rabbitMQChannel) {
      throw new Error('RabbitMQBus has not being properly initialized')
    }
  }

  private async createPublishTopics () {
    const eventNames = [...DomainEvent.derived].map(this.nameParser)
    console.log('Topics to be created:')
    await Promise.all(
      eventNames.map(async publishTopic => {
        console.log(publishTopic)
        await this.rabbitMQChannel!.assertExchange(publishTopic, 'topic', { durable: true })
        console.log(`created topic: ${publishTopic}`)
      })
    )
  }

  private async createConsumer () {
    const respCreate = await this.rabbitMQChannel!.assertQueue(this.consumeQueueName, { exclusive: true })

    if (!respCreate?.queue) {
      throw new Error('No queue url got from creation')
    }
    const queueUrl = respCreate.queue
    const eventNames = [...this.subscribers.keys()]
    console.log(`Queue created: ${queueUrl}`)
    await Promise.all(
      eventNames.map(async evtName => {
        this.rabbitMQChannel!.bindQueue(queueUrl, this.nameParser(evtName), this.nameParser(evtName))
        console.log(`Queue subscribed to : ${this.nameParser(evtName)}`)
      })
    )

    await this.rabbitMQChannel!.consume(queueUrl, async msg => {
      if (msg?.content) {
        await this.consumeMessage(msg.content)
      }
    })
  }

  private async consumeMessage (message: Buffer) {
    try {
      const event = this.deserializer!.deserialize(message.toString())
      if (event) {
        const subscribers = this.subscribers.get(event.eventName)
        if (subscribers && subscribers.length) {
          const subscribersExecutions = subscribers.map(subscriber => subscriber.on(event))
          await Promise.all(subscribersExecutions)
        }
      }
    } catch (error: unknown) {
      console.error(error)
    }
  }
}
