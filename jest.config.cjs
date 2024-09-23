/* eslint-disable @typescript-eslint/no-var-requires */
const { pathsToModuleNameMapper } = require("ts-jest");
const { compilerOptions } = require("./tsconfig.json");

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  modulePathIgnorePatterns: ["node_modules", "jest-test-results.json"],
  setupFiles: ["<rootDir>/src/server/tests/jestConfig/setupEnvVars.ts"],
  setupFilesAfterEnv: ["<rootDir>/src/server/tests/jestConfig/jest.setup.ts"],
  moduleFileExtensions: ["mjs", "js", "jsx", "ts", "tsx", "json", "node"],
  transform: {
    "^.+\\.m?(js|ts)x?$": [
      "babel-jest",
      { configFile: "./src/server/tests/jestConfig/babel.config.json" },
    ],
  },
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>/",
  }),
  collectCoverage: true,
  collectCoverageFrom: ["src/server/api/routers/**/*.{ts,tsx}"],
};
