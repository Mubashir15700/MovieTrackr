module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    testMatch: ['<rootDir>/tests/**/*.test.ts'], // Update testMatch pattern to match test file location
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.json', // Specify the path to your tsconfig.json file
            isolatedModules: true, // Ensure each test file is compiled in isolation
        },
    },
};
