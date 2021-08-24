import { Connection } from 'typeorm';
import UserRole from '../../models/enums/UserRole';
import User from '../../models/User';
import UserService from '../../services/UserService';
import TestUtils from '../TestUtils';

let connection: Connection;
const userService: UserService = new UserService();
const utils: TestUtils = new TestUtils();

describe('UserService Tests', () => {
  beforeAll(async () => {
    await utils.clearDatabaseAndRunMigrations();
    connection = await utils.getDatabaseTestConnection();
    User.useConnection(connection);
  });

  beforeEach(async () => {
    await utils.cleanUpTestDatabase();
  });

  afterAll(async () => {
    await utils.closeDatabaseConnections();
  });

  it('should be able to persist an User correctly', async () => {
    const userToBePersisted: User = {
      name: 'Silvia',
      lastName: 'Gomes',
      role: UserRole.MANAGER,
    } as User;

    const userPersisted = await userService.save(userToBePersisted);

    expect(userPersisted.id).toBeDefined();
    expect(userPersisted.name).toBeDefined();
    expect(userPersisted.created_at).toBeDefined();
    expect(userPersisted.role).toBeDefined();
    expect(userPersisted.updated_at).toBeDefined();
  });

  it('should be able to delete an User correctly', async () => {
    const userToBePersisted1 = {
      name: 'Silvia',
      lastName: 'Gomes',
      role: UserRole.MANAGER,
    } as User;

    const userToBePersisted2 = {
      name: 'Rui',
      lastName: 'Barbosa',
      role: UserRole.TECHNICIAN,
    } as User;

    const userPersisted1 = await userService.save(userToBePersisted1);
    const userPersisted2 = await userService.save(userToBePersisted2);

    const userRemoved1 = await userService.remove(userPersisted1.id || '');
    const userRemoved2 = await userService.remove(userPersisted2.id || '');

    expect(userRemoved1.id).toBeUndefined();
    expect(userRemoved2.id).toBeUndefined();
  });

  it('should be able to update an User correctly', async () => {
    const userToBePersisted = {
      name: 'Silvia',
      lastName: 'Gomes',
      role: UserRole.MANAGER,
    } as User;

    const userPersisted = await userService.save(userToBePersisted);

    userPersisted.name = 'Rui';
    userPersisted.lastName = 'Barros';

    const userUpdated = await userService.update(userPersisted);

    expect(userUpdated.name).toEqual('Rui');
    expect(userUpdated.lastName).toEqual('Barros');
  });

  it('should be able to read an User correctly', async () => {
    const userToBePersisted = {
      name: 'Rui',
      lastName: 'Barros',
      role: UserRole.MANAGER,
    } as User;

    const userPersisted = await userService.save(userToBePersisted);
    const userRead = await userService.findById(userPersisted.id);

    expect(userRead).toBeDefined();
    expect(userRead?.name).toEqual('Rui');
    expect(userRead?.lastName).toEqual('Barros');
  });
});
