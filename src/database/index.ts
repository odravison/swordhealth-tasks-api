import {
  createConnection,
  getConnectionOptions,
  Connection,
  ConnectionOptions,
} from 'typeorm';

export default async (name = 'default'): Promise<Connection> => {
  const defaultOptions: ConnectionOptions = await getConnectionOptions();

  const connectionOptions: ConnectionOptions = Object.assign(defaultOptions, {
    name,
    database:
      process.env.NODE_ENV === 'test'
        ? 'tasks_management_tests'
        : defaultOptions.database,
  });

  return createConnection(connectionOptions);
};
