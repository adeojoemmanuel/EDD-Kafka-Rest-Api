import { getBalance  } from './../blockchain-service/src/service/blockchain.service';
describe('Blockchain service', () => {
  test('getBlockchainData should be defined', () => {
    expect(getBalance).toBeDefined();
    expect(typeof getBalance).toBe('function');
  });
});
