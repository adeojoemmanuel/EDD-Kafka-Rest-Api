import { Request, Response } from 'express';

export const getProductnData = (req: Request, res: Response) => {
  // Mock product datsa
  res.json({ data: `Blockchain data for ${req.params.id}` });
};

export const allProdict = (req: Request, res: Response) => {
  // Process product transaction
  res.json({ status: 'Transaction processed' });
};
