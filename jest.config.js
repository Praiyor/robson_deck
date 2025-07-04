/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov"],
  testMatch: ["**/*.test.ts"],
  transform: {
    "^.+\\.ts$": ["ts-jest", { useESM: true }],
  },
  extensionsToTreatAsEsm: [".ts"],
  globals: {
    "ts-jest": {
      useESM: true,
      tsconfig: "./tsconfig.json",
    },
  },
};
