import express from 'express';
import { json } from 'body-parser';
import { getBlockchainData, processTransaction } from './src/controllers/blockchain.controller';
import { KafkaProducer, KafkaConsumer } from './src/kafka';

const app = express();
app.use(json());
 
app.get('/blockchain/:id', getBlockchainData);
app.post('/transaction', processTransaction);

// Initialize Kafka producer and consumer
KafkaProducer.init();
KafkaConsumer.init();

app.listen(3002, () => {
  console.log('Blockchain service running on port 3002');
});
