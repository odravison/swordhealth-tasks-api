import request from 'supertest';
import app from '../../app';
import UserRole from '../../models/enums/UserRole';
import Task from '../../models/Task';
import User from '../../models/User';
import TaskService from '../../services/TaskService';
import CreateUserService from '../../services/user/CreateUserService';
import TestUtils from '../TestUtils';

describe('Task API Tests', () => {
  describe('should not be able to access any route without authentication', () => {
    it('GET /task', async done => {
      request(app)
        .get('/tasks')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401, done);
    });
    it('POST /task', async done => {
      request(app)
        .post('/tasks')
        .send({})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401, done);
    });
  });

  it('should be able to save task (POST /task)', async done => {
    const createUserService: CreateUserService = new CreateUserService();
    const userToBePersisted: User = {
      name: 'Rui',
      lastName: 'Barbosa',
      role: UserRole.TECHNICIAN,
    } as User;
    const userPersisted = await createUserService.execute(userToBePersisted);

    const taskToBePersisted: Task = {
      owner: userToBePersisted,
      summary: TestUtils.generateString(2500),
    } as Task;

    request(app)
      .post('/tasks')
      .send(taskToBePersisted)
      .set('Accept', 'application/json')
      .set('Authorization', userPersisted.id as string)
      .expect('Content-Type', /json/)
      .expect(201, done);
  });

  it('Technician should not be able to remove task (DELETE /task)', async done => {
    const createUserService: CreateUserService = new CreateUserService();
    const userToBePersisted: User = {
      name: 'Rui',
      lastName: 'Barbosa',
      role: UserRole.TECHNICIAN,
    } as User;
    const userPersisted = await createUserService.execute(userToBePersisted);

    const taskToBePersisted: Task = {
      owner: userToBePersisted,
      summary: TestUtils.generateString(2500),
    } as Task;

    const taskService: TaskService = new TaskService();
    const taskPersisted: Task = await taskService.save(taskToBePersisted);

    request(app)
      .delete(`/tasks/${taskPersisted.id}`)
      .set('Accept', 'application/json')
      .set('Authorization', userPersisted.id as string)
      .expect('Content-Type', /json/)
      .expect(403, done);
  });
});
