import { LoginData, User } from '../models/user';
import { ApiUsersRepository } from '../services/api.user.repository';
import { appStore } from '../store/store';
import { loginUserAsync, registerUserAsync } from './user.thunks';

describe('Given the thunks created', () => {
  describe('When we use them', () => {
    test('Then, the registerUserAsync should call the repo', () => {
      const mockRepo = {
        create: jest.fn(),
      } as unknown as ApiUsersRepository;
      const mockUser = { email: '' } as unknown as LoginData;

      appStore.dispatch(registerUserAsync({ repo: mockRepo, user: mockUser }));
      expect(mockRepo.create).toHaveBeenCalled();
    });

    test('Then, the registerUserAsync have this property ', async () => {
      const mockUser = { userName: 'PAkito' } as unknown as LoginData;
      const mockRepo = {
        create: jest.fn().mockReturnValue(mockUser),
      } as unknown as ApiUsersRepository;
      window.alert = jest.fn();

      await appStore.dispatch(
        registerUserAsync({ repo: mockRepo, user: mockUser })
      );
      expect(mockRepo.create).toHaveBeenCalled();
      expect(window.alert).toHaveBeenCalled();
    });

    test('Then, the registerUserAsync have not this property ', async () => {
      const mockUser = { userName: undefined } as unknown as LoginData;
      const mockRepo = {
        create: jest.fn().mockReturnValue(mockUser),
      } as unknown as ApiUsersRepository;
      window.alert = jest.fn();

      await appStore.dispatch(
        registerUserAsync({ repo: mockRepo, user: mockUser })
      );
      expect(mockRepo.create).toHaveBeenCalled();
      expect(window.alert).toHaveBeenCalled();
    });

    test('Then, the loginUserAsync should call the repo', async () => {
      const mockUser = { userName: '' } as unknown as User;
      const mockLoginResponse = { token: '1', user: { id: '1' } };
      const navigateMocked = jest.fn();

      const mockRepo = {
        login: jest.fn().mockReturnValue(mockLoginResponse),
      } as unknown as ApiUsersRepository;

      await appStore.dispatch(
        loginUserAsync({
          repo: mockRepo,
          user: mockUser,
          navigate: navigateMocked,
        })
      );
      expect(mockRepo.login).toHaveBeenCalled();
      expect(navigateMocked).toHaveBeenCalled();
    });
  });
});
