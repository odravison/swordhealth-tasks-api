import AppError from '../errors/AppError';
import User from '../models/User';

class UserService {
  async remove(userId: string): Promise<User> {
    const user: User | undefined = await User.findOne(userId);

    if (user !== undefined) {
      return User.remove(user);
    }
    console.error('Remove user error. User: ', user);
    throw new AppError('User not found', 404);
  }

  async save(user: User): Promise<User> {
    if (user.id !== undefined) {
      console.error('Save user error. User: ', user);
      throw new AppError('User could not be saved', 400);
    }
    return User.save(user);
  }

  async update(user: User): Promise<User> {
    if (user === undefined || user.id === undefined) {
      console.error('Update user error. User: ', user);
      throw new AppError('User could not be updated', 400);
    }
    return User.save(user);
  }

  async findById(id: string | undefined): Promise<User | undefined> {
    return User.findOne(id);
  }
}

export default UserService;
