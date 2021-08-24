import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import BasicEntity from './BasicEntity';
import User from './User';

@Entity('tasks')
class Task extends BasicEntity {
  @Column()
  summary: string;

  @ManyToOne(() => User, {
    eager: true,
  })
  @JoinColumn({ name: 'owner_user_id' })
  owner: User;

  @Column({ type: 'datetime' })
  performed_date?: Date;
}

export default Task;
