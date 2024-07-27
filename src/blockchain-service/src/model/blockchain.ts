import mongoose, { Document, Schema } from 'mongoose';

export interface IBlockchainTransaction extends Document {
  transactionId: string;
  userId: mongoose.Types.ObjectId;
  amount: number;
  currency: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

const BlockchainTransactionSchema: Schema = new Schema({
  transactionId: { type: String, required: true, unique: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  status: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const BlockchainTransaction = mongoose.model<IBlockchainTransaction>(
  'BlockchainTransaction',
  BlockchainTransactionSchema
);
