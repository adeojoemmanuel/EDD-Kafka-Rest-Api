import {  Message } from 'kafka-node';
import { KafkaMessage as KafkaJsMessage } from 'kafkajs';

export type USERS = string    
export type BLOCKCHAINS = string;
export type CHAT = string;

export enum BlockchainEventType {
    TRANSACTION_CREATED = 'transaction-created',
    UNKNOWN = 'unknown',
  }
  
export interface ParsedMessage {
    event: BlockchainEventType;
    data: {
        transactionId: string;
    };
}

export type CustomKafkaMessage = Message & {
    value: string | Buffer | null;
    key?: string | Buffer | null;
    partition?: number;
};

export type CustomKafkaJsMessage = KafkaJsMessage & {
    value: Buffer;
    key: Buffer | null;
};

export interface CustomProducerOptions {
    kafkaHost: string;
}

export interface CustomConsumerOptions {
    autoCommit: boolean;
}