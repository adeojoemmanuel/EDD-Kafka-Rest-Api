import { KafkaClient, Producer, Consumer, Message } from 'kafka-node';
import { config } from '../config';


const client = new KafkaClient({ kafkaHost: config.kafkaBroker });
const producer = new Producer(client);

producer.on('ready', () => {
  console.log('Kafka Producer is ready');
});

producer.on('error', (err) => {
  console.error('Kafka Producer error:', err);
});

export const sendMessage = (topic: string, messages: Message | Message[]) => {
  producer.send([{ topic, messages }], (err, data) => {
    if (err) console.error('Kafka Producer send error:', err);
    else console.log('Message sent:', data);
  });
};

export const createUser = (topic: string, callback: (message: Message) => void) => {
  const user = new Consumer(client, [{ topic }], { autoCommit: true });
  
  user.on('message', (message) => {
    callback(message);
  });

  user.on('error', (err) => {
    console.error('Kafka Consumer error:', err);
  });
};
