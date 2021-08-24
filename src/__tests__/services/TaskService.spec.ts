import { Connection } from 'typeorm';
import UserRole from '../../models/enums/UserRole';
import Task from '../../models/Task';
import User from '../../models/User';
import TaskService from '../../services/TaskService';
import UserService from '../../services/UserService';
import TestUtils from '../TestUtils';

let connection: Connection;
const taskService: TaskService = new TaskService();
const userService: UserService = new UserService();
const utils: TestUtils = new TestUtils();

describe('TaskService Tests', () => {
  beforeAll(async () => {
    await utils.clearDatabaseAndRunMigrations();
    connection = await utils.getDatabaseTestConnection();
    Task.useConnection(connection);
    User.useConnection(connection);
  });

  beforeEach(async () => {
    await utils.cleanUpTestDatabase();
    const managerTestUser: User = {
      name: 'Silvia',
      lastName: 'Gomes',
      role: UserRole.MANAGER,
    } as User;

    const technicianUser: User = {
      name: 'Rui',
      lastName: 'Barbosa',
      role: UserRole.TECHNICIAN,
    } as User;

    await userService.save(managerTestUser);
    await userService.save(technicianUser);
  });

  afterAll(async () => {
    await utils.closeDatabaseConnections();
  });

  it('should be able to persist an Task correctly', async () => {
    const technicianUsers = await User.find({
      where: { role: UserRole.TECHNICIAN },
    });
    const technicianUser = technicianUsers.find(user => user);
    const taskToBePersisted: Task = {
      owner: technicianUser,
      summary: utils.generateString(2500),
    } as Task;

    const taskPersisted = await taskService.save(taskToBePersisted);

    expect(taskPersisted.id).toBeDefined();
    expect(taskPersisted.owner).toBeDefined();
    expect(taskPersisted.summary).toBeDefined();
    expect(taskPersisted.performed_date).toBeUndefined();
    expect(taskPersisted.created_at).toBeDefined();
    expect(taskPersisted.updated_at).toBeDefined();
  });

  it('should be able to delete an Task correctly', async () => {
    const technicianUsers = await User.find({
      where: { role: UserRole.TECHNICIAN },
    });
    const technicianUser = technicianUsers.find(user => user);
    const taskToBePersisted: Task = {
      owner: technicianUser,
      summary: utils.generateString(2500),
    } as Task;

    const taskPersisted = await taskService.save(taskToBePersisted);

    const taskRemoved = await taskService.remove(taskPersisted.id || '');

    expect(taskRemoved.id).toBeUndefined();
  });

  it('should be able to update an Task correctly', async () => {
    const technicianUsers = await User.find({
      where: { role: UserRole.TECHNICIAN },
    });
    const technicianUser = technicianUsers.find(user => user);
    const taskToBePersisted: Task = {
      owner: technicianUser,
      summary: utils.generateString(2500),
    } as Task;

    const taskPersisted = await taskService.save(taskToBePersisted);

    const newTaskSummary = utils.generateString(500);

    taskPersisted.summary = newTaskSummary;

    const taskUpdated = await taskService.update(taskPersisted);

    expect(taskUpdated.summary).toEqual(newTaskSummary);
  });

  it('should be able to read an Task correctly', async () => {
    const technicianUsers = await User.find({
      where: { role: UserRole.TECHNICIAN },
    });
    const technicianUser = technicianUsers.find(user => user);
    const taskSummaryToBePersisted = utils.generateString(195);
    const taskToBePersisted: Task = {
      owner: technicianUser,
      summary: taskSummaryToBePersisted,
    } as Task;

    const taskPersisted = await taskService.save(taskToBePersisted);

    const taskRead = await taskService.findById(taskPersisted.id);

    expect(taskRead).toBeDefined();
    expect(taskRead?.owner).toEqual(technicianUser);
    expect(taskRead?.summary).toEqual(taskSummaryToBePersisted);
  });
});
