import { getUser, createUser  } from './../user-service/src/service/user.service';
describe('user service', () => {
  test('getUser should be defined', () => {
    expect(getUser).toBeDefined();
    expect(typeof getUser).toBe('function');
  });

  test('create user should be defined', () => {
    expect(getUser).toBeDefined();
    expect(typeof getUser).toBe('function');
  });
});
