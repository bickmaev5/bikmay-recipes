process.env.REACT_APP_INTEGRATION_BROWSER = 'chrome';
process.env.REACT_APP_INTEGRATION_BASE_URL='http://localhost:3000'
module.exports = {
    rootDir: '../',
    setupFilesAfterEnv: [
        './test/isetup.ts',
    ],
    testPathIgnorePatterns: [
        '/node_modules/',
        '__data__',
    ],
    testMatch: ['**/__tests__/**/*.(ispec|itest).[jt]s?(x)'],
    globals: {
        "ts-jest": {
          tsConfig: "./tsconfig.jest.json"
        }
      },
      transform: {
        '^.+\\.ts?$': 'ts-jest',
      },
};
