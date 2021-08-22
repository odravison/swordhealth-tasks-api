import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import UserRole from './enums/UserRole';

@Entity('users')
class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.TECHNICIAN,
  })
  role: UserRole;
}

export default User;
