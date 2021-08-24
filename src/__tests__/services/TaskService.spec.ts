import UserRole from '../../models/enums/UserRole';
import Task from '../../models/Task';
import User from '../../models/User';
import TaskService from '../../services/TaskService';
import CreateUserService from '../../services/user/CreateUserService';
import TestUtils from '../TestUtils';

let taskService: TaskService;
let createUserService: CreateUserService;
let managerTestUser: User;
let technicianUser: User;

describe('TaskService Tests', () => {
  beforeAll(async () => {
    await TestUtils.clearDatabaseAndRunMigrations();
    taskService = new TaskService();
    createUserService = new CreateUserService();
  });

  beforeEach(async () => {
    await TestUtils.cleanUpTestDatabase();
    managerTestUser = {
      name: 'Silvia',
      lastName: 'Gomes',
      role: UserRole.MANAGER,
    } as User;

    technicianUser = {
      name: 'Rui',
      lastName: 'Barbosa',
      role: UserRole.TECHNICIAN,
    } as User;

    await createUserService.execute(managerTestUser);
    await createUserService.execute(technicianUser);
  });

  afterAll(async () => {
    await TestUtils.closeDatabaseConnections();
  });

  it('should be able to persist an Task correctly', async () => {
    const taskToBePersisted: Task = {
      owner: technicianUser,
      summary: TestUtils.generateString(2500),
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
    const taskToBePersisted: Task = {
      owner: technicianUser,
      summary: TestUtils.generateString(2500),
    } as Task;

    const taskPersisted = await taskService.save(taskToBePersisted);

    const taskRemoved = await taskService.remove(taskPersisted.id || '');

    expect(taskRemoved.id).toBeUndefined();
  });

  it('should be able to update an Task correctly', async () => {
    const taskToBePersisted: Task = {
      owner: technicianUser,
      summary: TestUtils.generateString(2500),
    } as Task;

    const taskPersisted = await taskService.save(taskToBePersisted);

    const newTaskSummary = TestUtils.generateString(500);

    taskPersisted.summary = newTaskSummary;

    const taskUpdated = await taskService.update(taskPersisted);

    expect(taskUpdated.summary).toEqual(newTaskSummary);
  });

  it('should be able to read an Task correctly', async () => {
    const taskSummaryToBePersisted = TestUtils.generateString(195);
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
