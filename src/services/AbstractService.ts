import { DeepPartial, Repository } from 'typeorm';
import AppError from '../errors/AppError';
import BasicEntity from '../models/BasicEntity';

abstract class AbstractService<T extends BasicEntity> {
  abstract getRepository(): Repository<T>;

  async findById(id: string | number | Date | undefined): Promise<T> {
    if (id === undefined) {
      console.error('Find entity error. Id undefined');
      throw new AppError('Id cannot be undefined', 400);
    }
    const entityFound: T | undefined = await this.getRepository().findOne(id);
    if (entityFound === undefined) {
      console.error('Find entity error. Entity: ', entityFound);
      throw new AppError('Entity not found', 404);
    }

    return entityFound;
  }

  async findAll(): Promise<T[]> {
    return this.getRepository().find();
  }

  async remove(id: string | number | Date | undefined): Promise<T> {
    if (id === undefined) {
      console.error('Remove entity error. Id undefined');
      throw new AppError('Id cannot be undefined', 400);
    }
    const entityFound: T | undefined = await this.findById(id);
    if (entityFound === undefined) {
      console.error('Remove entity error. Entity: ', entityFound);
      throw new AppError('Entity not found', 404);
    }
    return this.getRepository().remove(entityFound);
  }

  async save(entity: DeepPartial<T>): Promise<T> {
    if (entity.id !== undefined) {
      console.error('Save entity error. Entity: ', entity);
      throw new AppError('Entity could not be saved', 400);
    }
    return this.getRepository().save(entity);
  }

  async update(entity: DeepPartial<T>): Promise<T> {
    if (entity === undefined || entity.id === undefined) {
      console.error('Update entity error. Entity: ', entity);
      throw new AppError('Entity could not be updated', 400);
    }

    return this.getRepository().save(entity);
  }
}

export default AbstractService;
