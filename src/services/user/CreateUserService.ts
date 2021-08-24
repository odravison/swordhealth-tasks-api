import { getRepository, Repository } from 'typeorm';
import AppError from '../../errors/AppError';
import User from '../../models/User';

class CreateUserService {
  async execute(user: User): Promise<User> {
    const userRepository: Repository<User> = getRepository(User);

    if (user.id !== undefined) {
      console.error('Save user error. User: ', user);
      throw new AppError('User could not be saved', 400);
    }
    return userRepository.save(user);
  }
}

export default CreateUserService;
