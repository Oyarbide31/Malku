import { Post, PostCreate } from '../models/post';
import { ApiPostRepository } from './api.post.repository';

describe('Given ApiPostrepository', () => {
  describe('When we instantiate it', () => {
    const repo = new ApiPostRepository('');

    test('Then, we used method getAl()', () => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue('Test'),
      });
      repo.getAll();
      expect(global.fetch).toHaveBeenCalled();
    });

    test('Then, if we used method getAll() and it is an error', () => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: false,
        json: jest.fn().mockResolvedValue('Test'),
      });
      expect(repo.getAll()).rejects.toThrow();
    });

    test('Then, we used method getByID()', () => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue('Test'),
      });
      repo.getByID('');
      expect(global.fetch).toHaveBeenCalled();
    });
    test('Then, if we used mehtod getByID and it is an error', () => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: false,
        json: jest.fn().mockResolvedValue('Test'),
      });
      expect(repo.getByID('')).rejects.toThrow();
    });
    test('Then, we used method create(),', () => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce('Test'),
      });
      repo.create({} as PostCreate);
      expect(global.fetch).toHaveBeenCalled();
    });
    test('Then, we used method create and it is an error', () => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: false,
        json: jest.fn().mockResolvedValue('Test'),
      });
      expect(repo.create({} as PostCreate)).rejects.toThrow();
    });

    test('Then, we used method edit()', () => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue('Test'),
      });
      repo.edit({} as Post);
      expect(global.fetch).toHaveBeenCalled();
    });

    test('The method edit should be used with an error', () => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: false,
        json: jest.fn().mockResolvedValue('Test'),
      });
      expect(repo.edit({} as Post)).rejects.toThrow();
    });

    test('The method delete should be used', () => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue('Test'),
      });
      repo.delete({} as Post);
      expect(global.fetch).toHaveBeenCalled();
    });
    test('The method delete should be used with an error', () => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: false,
        json: jest.fn().mockResolvedValue('Test'),
      });
      expect(repo.delete({} as Post)).rejects.toThrow();
    });
  });
});
