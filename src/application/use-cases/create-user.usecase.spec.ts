import { CreateUserUseCase } from './create-user.usecase';
import { InMemoryUserRepository } from '../../infrastructure/adapters/persistence/in-memory-user.repository';

describe('CreateUserUseCase', () => {
  it('should create and save a user', async () => {
    const repo = new InMemoryUserRepository();
    const usecase = new CreateUserUseCase(repo as any);

    const user = await usecase.execute('1', 'Alice', 'alice@example.com');

    expect(user).toBeDefined();
    const stored = await repo.findById('1');
    expect(stored).not.toBeNull();
    expect(stored?.email).toBe('alice@example.com');
  });
});
