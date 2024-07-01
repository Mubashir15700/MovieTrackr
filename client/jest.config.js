export default {
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '\\.(css|scss)$': 'identity-obj-proxy'
    },
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
        '^.+\\.css$': 'jest-transform-css',
    },
};
