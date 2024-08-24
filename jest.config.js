module.exports = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
  transformIgnorePatterns: [
    "<rootDir>/node_modules/(?!d3-selection)/src/index.js",
  ],
};
