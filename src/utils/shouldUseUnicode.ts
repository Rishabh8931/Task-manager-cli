export function shouldUseUnicode(): boolean {
  if (process.env.TASK_CLI_ASCII !== undefined) {
    return false;
  }

  return process.stdout.isTTY === true;
}
