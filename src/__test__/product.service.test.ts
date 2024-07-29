import { getProductnData, allProdict } from './../product-service/src/service/product.service';

describe('product service', () => {
  test('product should be defined', () => {
    expect(getProductnData).toBeDefined();
    expect(typeof getProductnData).toBe('function');
  });

  test('processTransaction should be defined', () => {
    expect(allProdict).toBeDefined();
    expect(typeof allProdict).toBe('function');
  });
});
