import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // Path to your Next.js app
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jest-environment-jsdom",

  // TypeScript support
  preset: "ts-jest",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },

  // Module resolution - CORREGIDO
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },

  // Test patterns
  testMatch: ["**/__tests__/**/*.(ts|tsx|js)", "**/*.(test|spec).(ts|tsx|js)"],

  // Coverage
  collectCoverageFrom: ["src/**/*.(ts|tsx)", "!src/**/*.d.ts"],
};

export default createJestConfig(customJestConfig);
