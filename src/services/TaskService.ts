import { getRepository, Repository } from 'typeorm';
import AppError from '../errors/AppError';
import Task from '../models/Task';

class TaskService {
  private taskRepository: Repository<Task>;

  constructor() {
    this.taskRepository = getRepository(Task);
  }

  async remove(taskId: string): Promise<Task> {
    const task: Task | undefined = await this.taskRepository.findOne(taskId);

    if (task !== undefined) {
      return this.taskRepository.remove(task);
    }
    console.error('Remove task error. Task: ', task);
    throw new AppError('Task not found', 404);
  }

  async save(task: Task): Promise<Task> {
    if (task.id !== undefined) {
      console.error('Save task error. Task: ', task);
      throw new AppError('Task already exists', 400);
    }
    return this.taskRepository.save(task);
  }

  async update(task: Task): Promise<Task> {
    if (task === undefined || task.id === undefined) {
      console.error('Update task error. Task: ', task);
      throw new AppError('Task could not be updated', 400);
    }
    return this.taskRepository.save(task);
  }

  async findById(id: string | undefined): Promise<Task | undefined> {
    return this.taskRepository.findOne(id);
  }
}

export default TaskService;
