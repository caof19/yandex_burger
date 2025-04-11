export default {
  preset: 'ts-jest',
  testEnvironment: 'node', // или 'node' если не используете браузерное окружение
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testMatch: ['**/*.(test|spec).(ts|tsx)'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // если используете алиасы путей
  },
};