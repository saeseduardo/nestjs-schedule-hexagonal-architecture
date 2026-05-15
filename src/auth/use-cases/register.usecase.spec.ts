import { RegisterUseCase } from './register.usecase';
import { InMemoryUserRepository } from '../../../src/infrastructure/adapters/persistence/in-memory-user.repository';

describe('RegisterUseCase', () => {
  it('hashes password and saves user', async () => {
    const repo = new InMemoryUserRepository();
    const usecase = new RegisterUseCase(repo as any);

    const user = await usecase.execute('u1', 'Bob', 'bob@example.com', 'secret');

    expect(user).toBeDefined();
    const stored = await repo.findByEmail('bob@example.com');
    expect(stored).not.toBeNull();
    expect(stored?.password).not.toBe('secret');
  });
});
