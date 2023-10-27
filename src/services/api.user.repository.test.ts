import { LoginData } from '../models/user';
import { ApiUsersRepository } from './api.user.repository';

describe('Given the class ApiUserRepository', () => {
  describe('When it is instantiated', () => {
    const repo = new ApiUsersRepository('');
    const item = { '': '' } as unknown as LoginData;
    const item2 = { '': '' } as unknown as LoginData;

    test('Then, when we call the create() method', async () => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(['Test']),
      });
      await repo.create(item);
      expect(global.fetch).toHaveBeenCalled();
    });

    test('Then, when method create throws and is error', () => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: false,
        json: jest.fn().mockResolvedValueOnce(['error']),
      });
      expect(repo.create(item)).rejects.toThrow();
    });

    test('Then, When call to login', async () => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue(['Test']),
      });
      await repo.login(item2);
      expect(global.fetch).toHaveBeenCalled();
    });

    test('Then, when method login throws and is error', () => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: false,
        json: jest.fn().mockResolvedValueOnce(['error']),
        status: 400,
        statusText: 'TestError',
      });
      expect(repo.login(item2)).rejects.toThrow();
    });
  });
});
