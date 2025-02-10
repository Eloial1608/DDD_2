type AWSEventBusConfig = {
    endpoint_url: string | null;
    aws_account_id: string;
    aws_access_key_id: string;
    aws_secret_access_key: string;
    consume_queue_name: string;
    region: string;
    env: string;
  };

export default AWSEventBusConfig
