import { EnvVars } from "../types/env-types";

export const env: EnvVars = {
  USER: process.env.USER!,
  PASSWORD: process.env.PASSWORD!,
  INCORRECT_USER: process.env.INCORRECT_USER!,
  INCORRECT_PASSWORD: process.env.INCORRECT_PASSWORD!,
};
