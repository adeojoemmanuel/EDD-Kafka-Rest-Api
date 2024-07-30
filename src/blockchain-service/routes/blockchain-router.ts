import { Router } from 'express';
import Web3 from 'web3';
import { getBlockchainData, processTransaction  } from './../src/controllers/blockchain.controller';

const router = Router();

router.get('/register/:address', getBlockchainData);
router.get('/transaction/:address', processTransaction);

export default router;