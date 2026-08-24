import { colors } from "./colors.js";
import { symbols } from "./symbols.js";

export function success(message: string): void {
  console.log();
  console.log(`${colors.success(symbols.success)} ${message}`);
}

export function error(message: string): void {
  console.log();
  console.error(`${colors.error(symbols.error)} ${message}`);
}
