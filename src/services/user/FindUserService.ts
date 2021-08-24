import { getRepository, Repository } from 'typeorm';
import AppError from '../../errors/AppError';
import User from '../../models/User';

class FindUserService {
  async execute(id: string | undefined): Promise<User> {
    const userRepository: Repository<User> = getRepository(User);

    const userFound: User | undefined = await userRepository.findOne(id);

    if (!userFound) {
      console.error('Find user error: User not found.');
      throw new AppError('User not found', 404);
    }

    return userFound;
  }
}

export default FindUserService;
