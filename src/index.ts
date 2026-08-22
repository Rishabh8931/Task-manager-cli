#!/usr/bin/env node

import { dispatch } from "./dispatcher.js";

const args = process.argv.slice(2);

try {
  await dispatch(args);
} catch (error) {
  console.error(
    "Fatal error:",
    error instanceof Error ? error.message : String(error),
  );
  process.exitCode = 1;
}
