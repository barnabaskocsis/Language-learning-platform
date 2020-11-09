module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    coveragePathIgnorePatterns: ['/node_modules/'],
    transform: {
      '^.+\\.ts$': 'ts-jest',
    
    },
  };