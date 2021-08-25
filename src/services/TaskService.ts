import { getRepository, Repository } from 'typeorm';
import cryptoJs from 'crypto-js';
import Task from '../models/Task';
import { APP_SALT_KEY } from '../utils/ConstantUtils';
import AbstractService from './AbstractService';

class TaskService extends AbstractService<Task> {
  getRepository(): Repository<Task> {
    return getRepository(Task);
  }

  async save(task: Task): Promise<Task> {
    const encryptedSummary = cryptoJs.AES.encrypt(
      task.summary,
      APP_SALT_KEY,
    ).toString();
    const taskToBePersisted = task;

    taskToBePersisted.summary = encryptedSummary;

    return super.save(taskToBePersisted);
  }

  async findById(id: string): Promise<Task> {
    const taskFound = await super.findById(id);

    const encryptedTaskSummary: string = taskFound.summary;

    const decryptedSummaryBytes = cryptoJs.AES.decrypt(
      encryptedTaskSummary,
      APP_SALT_KEY,
    );

    const plainTextSummary = decryptedSummaryBytes.toString(cryptoJs.enc.Utf8);
    taskFound.summary = plainTextSummary;

    return taskFound;
  }
}

export default TaskService;
