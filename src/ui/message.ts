import { colors } from "./colors.js";
import { symbols } from "./symbols.js";

export function success(message: string): void {
  console.log(`${colors.success(symbols.success)} ${message}`);
}

export function error(message: string): void {
  console.error(`${colors.error(symbols.error)} ${message}`);
}
