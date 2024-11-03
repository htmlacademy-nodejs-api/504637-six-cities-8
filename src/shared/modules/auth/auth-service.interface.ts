import { UserEntity } from '../user/index.js';
import { LoginDto } from './dto/login.dto.js';

export interface IAuthService {
  authenticate: (user: UserEntity) => Promise<string>;
  verify: (dto: LoginDto) => Promise<UserEntity>;
}
