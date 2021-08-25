import UserRole from '../../models/enums/UserRole';
import User from '../../models/User';
import CreateUserService from '../../services/user/CreateUserService';
import FindUserService from '../../services/user/FindUserService';
import RemoveUserService from '../../services/user/RemoveUserService';
import UpdateUserService from '../../services/user/UpdateUserService';

const createUserService = new CreateUserService();
const removeUserService = new RemoveUserService();
const updateUserService = new UpdateUserService();
const findUserService = new FindUserService();

describe('UserService Tests', () => {
  it('should be able to persist an User correctly', async () => {
    const userToBePersisted: User = {
      name: 'Silvia',
      lastName: 'Gomes',
      role: UserRole.MANAGER,
    } as User;

    const userPersisted = await createUserService.execute(userToBePersisted);

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

    const userPersisted1 = await createUserService.execute(userToBePersisted1);
    const userPersisted2 = await createUserService.execute(userToBePersisted2);

    const userRemoved1 = await removeUserService.execute(
      userPersisted1.id || '',
    );
    const userRemoved2 = await removeUserService.execute(
      userPersisted2.id || '',
    );

    expect(userRemoved1.id).toBeUndefined();
    expect(userRemoved2.id).toBeUndefined();
  });

  it('should be able to update an User correctly', async () => {
    const userToBePersisted = {
      name: 'Silvia',
      lastName: 'Gomes',
      role: UserRole.MANAGER,
    } as User;

    const userPersisted = await createUserService.execute(userToBePersisted);

    userPersisted.name = 'Rui';
    userPersisted.lastName = 'Barros';

    const userUpdated = await updateUserService.execute(userPersisted);

    expect(userUpdated.name).toEqual('Rui');
    expect(userUpdated.lastName).toEqual('Barros');
  });

  it('should be able to read an User correctly', async () => {
    const userToBePersisted = {
      name: 'Rui',
      lastName: 'Barros',
      role: UserRole.MANAGER,
    } as User;

    const userPersisted = await createUserService.execute(userToBePersisted);
    const userRead = await findUserService.execute(userPersisted.id);

    expect(userRead).toBeDefined();
    expect(userRead?.name).toEqual('Rui');
    expect(userRead?.lastName).toEqual('Barros');
  });
});
