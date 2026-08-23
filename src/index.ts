#!/usr/bin/env node

import { dispatch } from "./dispatcher.js";
import { StorageAccessError } from "./errors/storage-access.error.js";
import { StorageCorruptedError } from "./errors/storage-corrupted.error.js";

const args = process.argv.slice(2);

try {
  await dispatch(args);
} catch (error) {
  handleCliError(error);
}

function handleCliError(error: unknown): void {
  if (error instanceof StorageAccessError) {
    console.error("Error: Unable to access the task storage.");
    process.exitCode = 1;
  } else if (error instanceof StorageCorruptedError) {
    console.error("Error: The task storage is corrupted.");
    process.exitCode = 1;
  } else {
    console.error("An unknown error occurred.");
    process.exitCode = 1;
  }
}
