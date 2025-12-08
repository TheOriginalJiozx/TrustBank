module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  collectCoverage: true,
  collectCoverageFrom: [
    'service/**/*.js'
  ],
  coverageDirectory: 'coverage',
  moduleFileExtensions: ['js', 'json'],
  verbose: true
};
