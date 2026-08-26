export function getTerminalWidth(): number {
  return process.stdout.columns ?? 80;
}

export function isInteractiveTerminal(): boolean {
  return Boolean(process.stdout.isTTY);
}
