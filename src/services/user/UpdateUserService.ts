import { getRepository, Repository } from 'typeorm';
import AppError from '../../errors/AppError';
import User from '../../models/User';

class UpdateUserService {
  async execute(user: User): Promise<User> {
    const userRepository: Repository<User> = getRepository(User);
    if (user === undefined || user.id === undefined) {
      console.error('Update user error. User: ', user);
      throw new AppError('User could not be updated', 400);
    }
    return userRepository.save(user);
  }
}

export default UpdateUserService;
