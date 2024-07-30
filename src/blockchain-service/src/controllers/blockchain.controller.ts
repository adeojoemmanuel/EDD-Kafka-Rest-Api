import { Request, Response } from 'express';
import { getBalance  } from './../service/blockchain.service';

export const getBlockchainData = (req: Request, res: Response) => {
  res.json({ data: `Blockchain data for ${req.params.id}` });
};

export const processTransaction = (req: Request, res: Response) => {
  res.json({ status: 'Transaction processed', data: getBalance });
};
