import TestUtils from './TestUtils';

jest.useFakeTimers();

beforeAll(async done => {
  await TestUtils.clearDatabaseAndRunMigrations();
  done();
});

beforeEach(async done => {
  await TestUtils.cleanUpTestDatabase();
  done();
});

afterAll(async done => {
  await TestUtils.closeDatabaseConnections();
  done();
});
