/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  testMatch: [
    "**/__tests__/**/*.(test|spec).(ts|tsx)",
    "**/?(*.)+(test|spec).(ts|tsx)",
  ],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  transform: {
    "^.+\\.(t|j)sx?$": ["ts-jest", { tsconfig: "tsconfig.test.json" }],
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@types$": "<rootDir>/src/types/index.ts",
    "^@types/(.*)$": "<rootDir>/src/types/$1",
    "\\.(css|scss|sass)$": "identity-obj-proxy",
    "\\.(svg|png|jpe?g|gif)$": "<rootDir>/tests/__mocks__/fileMock.js",
  },
};
