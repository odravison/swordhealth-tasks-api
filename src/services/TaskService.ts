import { getRepository, Repository } from 'typeorm';
import Task from '../models/Task';
import AbstractService from './AbstractService';

class TaskService extends AbstractService<Task> {
  getRepository(): Repository<Task> {
    return getRepository(Task);
  }
}

export default TaskService;
