import { Router } from 'express';
import Web3 from 'web3';
import { getBalance  } from './../src/service/blockchain.service';

const router = Router();

router.get('/register/:address', getBalance);

export default router;