export default {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
    testMatch: ["**/__tests__/**/*.(ts|tsx)", "**/?(*.)+(spec|test).(ts|tsx)"],
    moduleNameMapper: {
        "\\.(css|scss)$": "identity-obj-proxy",
    },
    setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
};
