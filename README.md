## Kafkas

- micro-serice Implementation using Kafka for event creation, subscription, distribution


## Build and Run Docker Containers:

- docker build -t auth-service ./auth-service
- docker build -t user-service ./user-service
- docker build -t blockchain-service ./blockchain-service
- docker build -t auth-service ./openai-chat

## Run Services:s

- docker run -p 3000:3000 auth-service
- docker run -p 3001:3001 user-service
- docker run -p 3003:3003 blockchain-service
- docker run -p 3001:3022 openai-chat
