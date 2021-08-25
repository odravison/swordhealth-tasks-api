import { Router } from 'express';
import CreateTaskRequestDTO from '../dtos/CreateTaskRequestDTO';
import CreateTaskResponseDTO from '../dtos/CreateTaskResponseDTO';
import AppError from '../errors/AppError';
import Task from '../models/Task';
import User from '../models/User';
import TaskService from '../services/TaskService';
import TaskValidations from '../validations/TaskValidations';

const taskRouter = Router();

taskRouter.get('/', async (request, response) => {
  const taskService = new TaskService();
  const tasks: Task[] = await taskService.findAll();

  return response.status(200).json({ tasks });
});

taskRouter.get('/:id', async (request, response) => {
  const { id } = request.params;
  const authenticatedUser = response.locals.authenticatedUser as User;

  const taskService = new TaskService();
  const task: Task | undefined = await taskService.findById(id);

  if (task === undefined) {
    throw new AppError('Task not found', 404);
  }

  TaskValidations.validateGetAndRemoveTaskPermission(task, authenticatedUser);

  return response.status(200).json({ task });
});

taskRouter.post('/', async (request, response) => {
  const authenticatedUser = response.locals.authenticatedUser as User;

  TaskValidations.validateCreateTaskPermission(authenticatedUser);

  const createTaskDTO: CreateTaskRequestDTO =
    request.body as CreateTaskRequestDTO;

  const taskToBePersisted = {
    owner: authenticatedUser,
    summary: createTaskDTO.summary,
  } as Task;

  const taskService = new TaskService();
  const taskPersisted: Task = await taskService.save(taskToBePersisted);
  const responseTask: CreateTaskResponseDTO = {
    id: taskPersisted.id,
    ownwer_id: taskPersisted.owner.id,
    summary: taskPersisted.summary,
  };

  return response.status(201).json(responseTask);
});

taskRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;
  const authenticatedUser = response.locals.authenticatedUser as User;
  const taskService = new TaskService();
  const taskFound: Task | undefined = await taskService.findById(id);

  if (taskFound === undefined) {
    throw new AppError('Task not found', 404);
  }

  TaskValidations.validateGetAndRemoveTaskPermission(
    taskFound,
    authenticatedUser,
  );

  await taskService.remove(taskFound.id);

  return response.status(204);
});

export default taskRouter;
