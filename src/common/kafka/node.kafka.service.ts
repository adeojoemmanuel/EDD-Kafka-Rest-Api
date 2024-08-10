import { 
  KafkaClient, 
  Producer, 
  Consumer, 
  Message, 
  ProduceRequest 
} from 'kafka-node';
import { config } from '../config';
import { 
  BlockchainEventType, 
  ParsedMessage, 
  CustomKafkaMessage, 
  CustomKafkaJsMessage} 
from './kafka-topic.type';


// Initialize Kafka Client and Producer
const userClient: KafkaClient = new KafkaClient({ kafkaHost: config.kafkaBroker });
const userProducer: Producer = new Producer(userClient);

// Initialize Kafka Client and Consumer for Blockchain
const blockchainClient: KafkaClient = new KafkaClient({ kafkaHost: 'localhost:9092' });
const blockchainConsumer: Consumer = new Consumer(
  blockchainClient,
  [{ topic: 'blockchain-transaction', partition: 0 }],
  {
    autoCommit: true,
  }
);

userProducer.on('ready', (): void => {
  console.log('Kafka Producer is ready');
});

userProducer.on('error', (err: Error): void => {
  console.error('Kafka Producer error:', err);
});

// Function to handle messages received by the blockchain consumer
export const blockchainBroker = (
  topic: string, 
  messages: CustomKafkaMessage | CustomKafkaMessage[]
): void => {
  blockchainConsumer.on('message', (message: Message): void => {
    const parsedMessage: ParsedMessage = JSON.parse(message.value?.toString() || '{}');

    switch (parsedMessage.event) {
      case BlockchainEventType.TRANSACTION_CREATED:
        console.log(`Transaction created: ${parsedMessage.data.transactionId}`);
        break;
      default:
        console.log(`Unknown event type: ${parsedMessage.event}`);
    }
  });

  blockchainConsumer.on('error', (err: Error): void => {
    console.error('Kafka Consumer error:', err);
  });
};

// send a single message
export const sendSingleMessage = (
  topic: string, 
  messages: CustomKafkaMessage | CustomKafkaMessage[]
): void => {
  userProducer.send([{ topic, messages }], (err: Error | null, data: any): void => {
    if (err) {
      console.error('Kafka Producer send error:', err);
    } else {
      console.log('Message sent:', data);
    }
  });
};

// send multiple messages
export const sendMultipleMessage = (
  topic: string, 
  messages: CustomKafkaMessage | CustomKafkaMessage[],
  producer: Producer
): void => {
  const messagesArray: CustomKafkaMessage[] = Array.isArray(messages) ? messages : [messages];
  const produceRequests: ProduceRequest[] = messagesArray.map((msg): ProduceRequest => ({
    topic,
    messages: [
      {
        value: msg.value,
        key: msg.key,
      },
    ],
    partition: msg.partition,
  }));

  producer.send(produceRequests, (err: Error | null, data: any): void => {
    if (err) {
      console.error('Kafka Producer send error:', err);
    } else {
      console.log('Message sent:', data);
    }
  });
};

// convert a message to KafkaJS message format
const convertToKafkaJsMessage = (message: CustomKafkaMessage): CustomKafkaJsMessage => {
  return {
    value: Buffer.isBuffer(message.value) ? message.value : Buffer.from(message.value || ''),
    key: message.key ? (Buffer.isBuffer(message.key) ? message.key : Buffer.from(message.key)) : null,
    timestamp: Date.now().toString(),
    headers: {}, 
    offset: '0',
    attributes: 0,
  };
};

// create a consumer for service customer
export const createServiceCustomer = (
  topic: string,
  callback: (message: CustomKafkaJsMessage) => Promise<void>
): (() => Promise<void>) => {
  const user: Consumer = new Consumer(userClient, [{ topic }], { autoCommit: true });

  user.on('message', async (message: Message): Promise<void> => {
    sendSingleMessage('user-events', message);
    const kafkaJsMessage: CustomKafkaJsMessage = convertToKafkaJsMessage(message);
    await callback(kafkaJsMessage);
  });

  user.on('error', (err: Error): void => {
    console.error('Kafka Consumer error:', err);
  });

  return async (): Promise<void> => {
    user.close(true, (err: Error | null): void => {
      if (err) {
        console.error('Error closing consumer:', err);
      } else {
        console.log('Consumer closed successfully');
      }
    });
  };
};
