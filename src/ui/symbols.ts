import { shouldUseUnicode } from "../utils/shouldUseUnicode.js";

export const symbols = shouldUseUnicode()
  ? {
      success: "✓",
      error: "✗",
      warning: "⚠",
      todo: "○",
      inProgress: "◐",
      done: "✓",
      connector: "│",
    }
  : ({
      success: "+",
      error: "x",
      warning: "!",
      todo: "-",
      inProgress: "~",
      done: "+",
      connector: "|",
    } as const);
