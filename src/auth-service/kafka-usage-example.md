import express from 'express';
import { json } from 'body-parser';
import { generateToken, validateToken } from './src/service/auth.service';
import { KafkaProducer, KafkaConsumer } from './src/kafka';

const app = express();
app.use(json());

app.post('/token', generateToken);
app.get('/verify', validateToken);

KafkaProducer.init();
KafkaConsumer.init();
