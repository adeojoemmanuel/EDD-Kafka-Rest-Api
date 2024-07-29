import { getBlockchainData, processTransaction  } from './../blockchain-service/src/service/blockchain.service';
describe('Blockchain service', () => {
  test('getBlockchainData should be defined', () => {
    expect(getBlockchainData).toBeDefined();
    expect(typeof getBlockchainData).toBe('function');
  });

  test('processTransaction should be defined', () => {
    expect(processTransaction).toBeDefined();
    expect(typeof processTransaction).toBe('function');
  });
});
