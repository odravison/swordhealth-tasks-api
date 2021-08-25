module.exports = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,
  // Include all spec test files
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  // A preset that is used as a base for Jest's configuration
  preset: 'ts-jest',
  // The test environment that will be used for testing
  testEnvironment: 'node',
  // Max number of worker in 1 to use one core and avoid concurrent
  maxWorkers: 1,
  // File to setup Jest
  setupFilesAfterEnv: ['<rootDir>/src/__tests__/JestSetup.ts']
};
