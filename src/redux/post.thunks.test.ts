import { Post, PostCreate } from '../models/post';
import { ApiPostRepository } from '../services/api.post.repository';
import { appStore } from '../store/store';
import {
  createPostAsync,
  deletePostAsync,
  editPostAsync,
  getAllPostAsync,
  getByIDPostAsync,
} from './post.thunks';

describe('Given the postThunks ', () => {
  describe('When we dispatch getAllPostAsync', () => {
    test('Then repo method for that is called', () => {
      const mockRepo = {
        getAll: jest.fn().mockImplementation(() => [{ post: '1' }]),
      } as unknown as ApiPostRepository;
      appStore.dispatch(getAllPostAsync({ repo: mockRepo }));
      expect(mockRepo.getAll).toHaveBeenCalled();
    });
  });

  describe('When we dispatch getByIDPostAsync', () => {
    test('Then repo method for that is called', () => {
      const mockRepo = {
        getByID: jest.fn().mockImplementation(() => ({ post: '1' })),
      } as unknown as ApiPostRepository;
      appStore.dispatch(getByIDPostAsync({ repo: mockRepo, id: '1' }));
      expect(mockRepo.getByID).toHaveBeenCalled();
    });
  });

  describe('When we dispatch createPostAsync', () => {
    test('Then repo method for that is called', () => {
      const post: PostCreate = {
        title: 'post creado',
        body: '',
        category: 'exterior',
        imageData: '',
        authorId: '',
      };
      const mockRepo = {
        create: jest.fn().mockImplementation(() => post),
      } as unknown as ApiPostRepository;
      appStore.dispatch(
        createPostAsync({ repo: mockRepo, post, navigate: () => {} })
      );
      expect(mockRepo.create).toHaveBeenCalled();
    });
    test('Then if post is created, I see an alert with ok msg', async () => {
      const post: PostCreate = {
        title: 'post creado',
        body: '',
        category: 'exterior',
        imageData: '',
        authorId: '',
      };

      window.alert = jest.fn().mockImplementation(() => {});

      const mockRepo = {
        create: jest.fn().mockImplementation(() => post),
      } as unknown as ApiPostRepository;
      await appStore.dispatch(
        createPostAsync({ repo: mockRepo, post, navigate: () => {} })
      );
      expect(window.alert).toHaveBeenCalled();
    });
    test('Then if post is not created, I see an alert with fail msg', async () => {
      const post: PostCreate = {
        body: '',
        category: 'exterior',
        imageData: '',
        authorId: '',
      } as unknown as PostCreate;

      window.alert = jest.fn().mockImplementation(() => {});

      const mockRepo = {
        create: jest.fn().mockImplementation(() => post),
      } as unknown as ApiPostRepository;
      await appStore.dispatch(
        createPostAsync({ repo: mockRepo, post, navigate: () => {} })
      );
      expect(window.alert).toHaveBeenCalled();
    });
  });

  describe('When we dispatch editPostAsync', () => {
    test('Then repo method for that is called', () => {
      const post: Post = {
        title: 'post creado',
        body: '',
        category: 'exterior',
        imageData: '',
        authorId: '',
      } as unknown as Post;
      const mockRepo = {
        edit: jest.fn().mockImplementation(() => post),
      } as unknown as ApiPostRepository;
      appStore.dispatch(
        editPostAsync({ repo: mockRepo, post, navigate: () => {} })
      );
      expect(mockRepo.edit).toHaveBeenCalled();
    });
    test('Then if post is edit, I see an alert with ok msg', async () => {
      const post: Post = {
        title: 'post creado',
        body: '',
        category: 'exterior',
        imageData: '',
        authorId: '',
      } as unknown as Post;

      window.alert = jest.fn().mockImplementation(() => {});

      const mockRepo = {
        edit: jest.fn().mockImplementation(() => post),
      } as unknown as ApiPostRepository;
      await appStore.dispatch(
        editPostAsync({ repo: mockRepo, post, navigate: () => {} })
      );
      expect(window.alert).toHaveBeenCalled();
    });
    test('Then if post is not edit, I see an alert with fail msg', async () => {
      const post: Post = {
        body: '',
        category: 'exterior',
        imageData: '',
        authorId: '',
      } as unknown as Post;

      window.alert = jest.fn().mockImplementation(() => {});

      const mockRepo = {
        edit: jest.fn().mockImplementation(() => post),
      } as unknown as ApiPostRepository;
      await appStore.dispatch(
        editPostAsync({ repo: mockRepo, post, navigate: () => {} })
      );
      expect(window.alert).toHaveBeenCalled();
    });
  });

  describe('When we dispatch deletePostAsync', () => {
    test('Then repo method for that is called', () => {
      const post: Post = {
        title: 'post creado',
        body: '',
        category: 'exterior',
        imageData: '',
        authorId: '',
      } as unknown as Post;

      const mockRepo = {
        delete: jest.fn().mockImplementation(() => post),
      } as unknown as ApiPostRepository;
      appStore.dispatch(
        deletePostAsync({ repo: mockRepo, post, navigate: () => {} })
      );
      expect(mockRepo.delete).toHaveBeenCalled();
    });
    test('Then if post is deleted, I see an alert with ok msg', async () => {
      const post: Post = {
        title: 'post creado',
        body: '',
        category: 'exterior',
        imageData: '',
        authorId: '',
      } as unknown as Post;

      window.alert = jest.fn().mockImplementation(() => {});

      const mockRepo = {
        delete: jest.fn().mockImplementation(() => post),
      } as unknown as ApiPostRepository;
      await appStore.dispatch(
        deletePostAsync({ repo: mockRepo, post, navigate: () => {} })
      );
      expect(window.alert).toHaveBeenCalled();
    });
    test('Then if post is not deleted, I see an alert with fail msg', async () => {
      const post: Post = {
        body: '',
        category: 'exterior',
        imageData: '',
        authorId: '',
      } as unknown as Post;

      window.alert = jest.fn().mockImplementation(() => {});

      const mockRepo = {
        delete: jest.fn().mockRejectedValue('Pst Error'),
      } as unknown as ApiPostRepository;
      await appStore.dispatch(
        deletePostAsync({ repo: mockRepo, post, navigate: () => {} })
      );
      expect(window.alert).toHaveBeenCalled();
    });
  });
});
