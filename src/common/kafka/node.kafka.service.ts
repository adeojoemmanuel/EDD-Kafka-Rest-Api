import { KafkaClient, Producer, Consumer, Message, ProduceRequest } from 'kafka-node';
import { config } from '../config';

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
    key: msg.key,
  }));

  producer.send(produceRequests, (err, data) => {
    if (err) {
      console.error('Kafka Producer send error:', err);
    } else {
      console.log('Message sent:', data);
    }
  });
};

export const createUserCustomer = (topic: string, callback: (message: Message) => void) => {
  const user = new Consumer(client, [{ topic }], { autoCommit: true });
  
  user.on('message', (message) => {
    callback(message);
  });

  user.on('error', (err) => {
    console.error('Kafka Consumer error:', err);
  });
};
