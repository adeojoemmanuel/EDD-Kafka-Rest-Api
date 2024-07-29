import { Kafka, KafkaMessage, logLevel } from 'kafkajs';
import { KafkaClient, Producer, Consumer, Message } from 'kafka-node';
const kafkAuth = new Kafka({
  clientId: 'auth-app',
  brokers: ['localhost:9091'],
  logLevel: logLevel.ERROR,
});

const kafkaUser = new Kafka({
  clientId: "user-system",
  brokers: ["localhost:9092"],
});

const kafkaProduct = new Kafka({
  clientId: "user-system",
  brokers: ["localhost:9092"],
});

const kafkaBlockchain = new Kafka({
  clientId: "user-system",
  brokers: ["localhost:9092"],
});


const producer = kafkAuth.producer();
const consumer = kafkAuth.consumer({ groupId: 'product-group' });


export const KafkaProducer = {
  async init() {
    try {
      await producer.connect();
      console.log('Producer connected successfully.');
    } catch (error) {
      console.error('Error connecting producer:', error);
    }
  },
  async sendMessage(topic: string, message: string) {
    try {
      await producer.send({
        topic,
        messages: [{ value: message }],
      });
      console.log(`Message sent: ${message}`);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  },
};

export const KafkaConsumer = {
  async init() {
    try {
      await consumer.connect();
      console.log('Consumer connected successfully.');
      await consumer.subscribe({ topic: 'product-events' });
      console.log('Subscribed to topic: product-events');

      await consumer.run({
        eachMessage: async ({ topic, partition, message }: { topic: string; partition: number; message: KafkaMessage }) => {
          try {
            const decodedMessage = message.value?.toString() || '';
            if (decodedMessage) {
              console.log(`Received message: ${decodedMessage} from topic: ${topic}, partition: ${partition}`);
            } else {
              console.warn(`Received a null or empty message from topic: ${topic}, partition: ${partition}`);
            }
          } catch (err) {
            console.error('Error processing message:', err);
          }
        },
      });
    } catch (error) {
      console.error('Error with consumer initialization:', error);
    }
  },
};
