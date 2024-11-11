type RabbitMQEventBusConfig = {
    env: string;
    hostname: string;
    user: string;
    password: string;
    port: number;
    queue_name: string;
    protocol: string;
    vhost: string;
  };

export default RabbitMQEventBusConfig
