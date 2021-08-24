module.exports = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // watchPathIgnorePatterns: [
  //   "<rootDir>/src/__tests__/ConstUtils.ts",
  //   "<rootDir>/src/__tests__/TestUtils.ts",
  //   "<rootDir>/src/__tests__/api/TaskApi.spec.ts"
  // ],
  testPathIgnorePatterns: [
    "<rootDir>/src/__tests__/ConstUtils.ts",
    "<rootDir>/src/__tests__/TestUtils.ts",
    "<rootDir>/src/__tests__/api/TaskApi.spec.ts"
  ],
  // coveragePathIgnorePatterns: [
  //   "<rootDir>/src/__tests__/ConstUtils.ts",
  //   "<rootDir>/src/__tests__/TestUtils.ts",
  //   "<rootDir>/src/__tests__/api/TaskApi.spec.ts"
  // ],

  // A preset that is used as a base for Jest's configuration
  preset: 'ts-jest',

  // The test environment that will be used for testing
  testEnvironment: 'node'
};
