import { colors } from "./colors.js";
import { symbols } from "./symbols.js";
import { shouldUseColor } from "../utils/shouldUseColor.js";

export function success(message: string): void {
  console.log();
  console.log(
    shouldUseColor()
      ? `${colors.success(symbols.success)} ${message}`
      : message,
  );
}

export function error(message: string): void {
  console.log();
  console.error(
    shouldUseColor() ? `${colors.error(symbols.error)} ${message}` : message,
  );
}
