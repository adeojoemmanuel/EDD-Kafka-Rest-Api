import express from 'express';
import { json } from 'body-parser';
import { getUser, createUserc } from './controllers/user.controller';
import { KafkaProducer, KafkaConsumer } from './kafka';

const app = express();
app.use(json());

app.get('/user/:id', getUser);
app.post('/user', createUserc);

// Initialize Kafka producer and consumer
KafkaProducer.init();
KafkaConsumer.init();

app.listen(3001, () => {
  console.log('User service running on port 3001');
});
