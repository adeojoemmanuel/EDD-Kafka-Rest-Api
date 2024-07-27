import express from 'express';
import { json } from 'body-parser';
import { getProduct, createProduct } from './services/product.service';
import { KafkaProducer, KafkaConsumer } from './kafka';

const app = express();
app.use(json());

app.get('/product/:id', getProduct);
app.post('/product', createProduct);

// Initialize Kafka producer and consumer
KafkaProducer.init();
KafkaConsumer.init();

app.listen(3003, () => {
  console.log('Product service running on port 3003');
});
