import chalk from "chalk";

export const colors = {
  primary: chalk.white,
  secondary: chalk.gray,
  muted: chalk.dim,
  success: chalk.green,
  warning: chalk.yellow,
  error: chalk.red,
  accent: chalk.cyan,
  header: chalk.bold.white,
} as const;
