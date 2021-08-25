import AppError from '../errors/AppError';
import UserRole from '../models/enums/UserRole';
import Task from '../models/Task';
import User from '../models/User';

class TaskValidations {
  static validateGetAndRemoveTaskPermission(
    taskFound: Task,
    authenticatedUser: User,
  ): void {
    if (
      taskFound.owner.id !== authenticatedUser.id ||
      authenticatedUser.role !== UserRole.MANAGER
    ) {
      throw new AppError('Forbidden operation', 403);
    }
  }

  static validateCreateTaskPermission(authenticatedUser: User): void {
    if (authenticatedUser.role !== UserRole.TECHNICIAN) {
      throw new AppError('Forbidden operation', 403);
    }
  }
}

export default TaskValidations;
