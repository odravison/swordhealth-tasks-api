import { getRepository, Repository } from 'typeorm';
import AppError from '../../errors/AppError';
import User from '../../models/User';

class RemoveUserService {
  async execute(userId: string): Promise<User> {
    const userRepository: Repository<User> = getRepository(User);
    const user: User | undefined = await userRepository.findOne(userId);

    if (user !== undefined) {
      return userRepository.remove(user);
    }
    console.error('Remove user error. User: ', user);
    throw new AppError('User not found', 404);
  }
}

export default RemoveUserService;
