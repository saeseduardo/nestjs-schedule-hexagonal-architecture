import { User } from '../user';

export const TOKEN_SERVICE = Symbol('TOKEN_SERVICE');

export interface TokenService {
  generate(user: User): Promise<string>;
}
