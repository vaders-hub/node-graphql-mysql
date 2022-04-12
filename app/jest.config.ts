import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  // transform: {
  //   "^.+\\.ts$": "ts-jest"
  // },
  setupFiles: ["dotenv/config"],
  verbose: true,
  collectCoverage: true,
  moduleFileExtensions: ["ts", "js", "mjs"],
  testRegex: "((\\.|/*.)(test))\\.ts?$",
};

export default config;
