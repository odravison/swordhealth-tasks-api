import { getRepository, Repository } from 'typeorm';
import AppError from '../../errors/AppError';
import User from '../../models/User';

class FindAuthenticatedUserService {
  async execute(authenticationToken: string): Promise<User> {
    const userRepository: Repository<User> = getRepository(User);

    /* A little pass by to validate Authentication User */
    const userFound: User | undefined = await userRepository.findOne(
      authenticationToken,
    );

    if (!userFound) {
      console.error('Find user error: User not found.');
      throw new AppError('User not found', 404);
    }

    return userFound;
  }
}

export default FindAuthenticatedUserService;
