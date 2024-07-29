const app = express();
app.use(json());

app.post('/token', generateToken);
app.get('/verify', validateToken);

KafkaProducer.init();
KafkaConsumer.init();
