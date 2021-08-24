import { Column, Entity } from 'typeorm';
import BasicEntity from './BasicEntity';
import UserRole from './enums/UserRole';

@Entity('users')
class User extends BasicEntity {
  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.TECHNICIAN,
  })
  role: UserRole;
}

export default User;
