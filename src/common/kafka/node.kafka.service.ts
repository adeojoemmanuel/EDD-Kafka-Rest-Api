import { KafkaClient, Producer, Consumer, Message, ProduceRequest } from 'kafka-node';
import { config } from '../config';
import { KafkaMessage as KafkaJsMessage } from 'kafkajs';

const client = new KafkaClient({ kafkaHost: config.kafkaBroker });
const producer = new Producer(client);

producer.on('ready', () => {
  console.log('Kafka Producer is ready');
});

producer.on('error', (err) => {
  console.error('Kafka Producer error:', err);
});


export const sendSingleMessage = (topic: string, messages: Message | Message[]) => {
  producer.send([{ topic, messages }], (err, data) => {
    if (err) console.error('Kafka Producer send error:', err);
    else console.log('Message sent:', data);
  });
};

export const sendMultipleMessage = (
  topic: string,
  messages: Message | Message[],
  producer: Producer
) => {
  const messagesArray = Array.isArray(messages) ? messages : [messages];
  const produceRequests: ProduceRequest[] = messagesArray.map((msg) => ({
    topic,
    messages: [
      {
        value: msg.value,
        key: msg.key,
      },
    ],
    partition: msg.partition,
  }));

  producer.send(produceRequests, (err, data) => {
    if (err) {
      console.error('Kafka Producer send error:', err);
    } else {
      console.log('Message sent:', data);
    }
  });
};

const convertToKafkaJsMessage = (message: Message): KafkaJsMessage => {
  return {
    value: Buffer.isBuffer(message.value) ? message.value : Buffer.from(message.value || ''),
    key: Buffer.isBuffer(message.key) ? message.key : (message.key ? Buffer.from(message.key) : null),
    timestamp: Date.now().toString(),
    headers: {}, 
    offset: '0',
    attributes: 0,
  };
};

export const creatServiceCustomer = (
  topic: string,
  callback: (message: KafkaJsMessage) => Promise<void>
): (() => Promise<void>) => {
  const user = new Consumer(client, [{ topic }], { autoCommit: true });
  
  user.on('message', (message) => {
    sendSingleMessage('user-events', message);
    const kafkaJsMessage = convertToKafkaJsMessage(message);
    callback(kafkaJsMessage);
  });

  user.on('error', (err) => {
    console.error('Kafka Consumer error:', err);
  });

  return async () => {
    user.close(true, (err) => {
      if (err) console.error('Error closing consumer:', err);
      else console.log('Consumer closed successfully');
    });
  };
};
